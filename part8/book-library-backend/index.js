const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const config = require('./utils/config')

const JWT_SECRET = config.SECRET_KEY

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

// MongoDB connection establishment
const MONGODB_URI = config.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const typeDefs = gql`
type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
      addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String!]!
      ) : Book
      editAuthor(
          name: String!
          setBornTo: Int!
      ) : Author,
      addAuthor(
          name: String!
          born: Int
      ) : Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }

  type Subscription {
    bookAdded: Book!
  }  
`
const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (!args.author && !args.genre) {
                return Book.find({})
            }
            // Needs working
            if (args.genre && args.author) {
                return books.filter(book => book.author === args.author).filter(book => book.genres.includes(args.genre))
            }
            if (args.author) {
                return books.filter(book => book.author === args.author)
            }
            if (args.genre === 'all genres') {
                return Book.find({})
            }
            return Book.find({
                genres: {
                    $in: [args.genre]
                }
            })
        },
        // allAuthors: async () => await Author.find({}),
        allAuthors: async () => {
            const authors = await Author.find({})
            const books = await Book.find({})

            const authorWithBookCount = authors.map((author) => {
                let count = 0
                books.forEach((book) => {
                    if (String(book.author._id) === String(author._id)) {
                        count++
                    }
                })
                author.bookCount = count
                return author
            })

            return authorWithBookCount
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    // Author: {
    //     bookCount: async (root) => {
    //         const temp = await Book.find({ author: root.id })
    //         return temp.length
    //     }
    // },
    Book: {
        author: async (root) => {
            const author = await Author.findOne({ _id: root.author })
            return author
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const book = new Book({ ...args })
            let checkAuthor = await Author.findOne({ name: args.author })

            if (!checkAuthor) {
                const author = new Author({ name: args.author })

                try {
                    checkAuthor = await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            book.author = checkAuthor._id

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },
        addAuthor: async (root, args) => {
            const author = new Author({ ...args })

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return author
        },
        // Needs working
        editAuthor: async (root, args, { currentUser }) => {

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: args.name })
            if (!author) {
                return null
            }

            return await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
        },
        createUser: async (root, args) => {
            const user = new User({ ...args })

            try {
                await user.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})