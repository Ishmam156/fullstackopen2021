describe('Blog App', function () {

  beforeEach( function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ishmam Chowdhury',
      username: 'admin',
      password: 'control'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log into application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {

    it('should successfully sign in with correct credentials', () => {
      cy.get('#username').type('admin')
      cy.get('#password').type('control')
      cy.get('#loginSubmit').click()

      cy.contains('Logged in as : Ishmam Chowdhury')
      cy.contains('Logout')
      cy.get('html').should('not.contain', 'log into application')
    })

    it('should fail with incorrect credentials', () => {
      cy.get('#username').type('admin')
      cy.get('#password').type('con')
      cy.get('#loginSubmit').click()

      cy.get('.failure')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'admin', password: 'control' })
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()

      cy.get('#title').type('Checking out a new blog')
      cy.get('#author').type('Stack Overflow')
      cy.get('#url').type('www.google.com')
      cy.get('#blogSubmit').click()

      cy.get('.success')
        .should('contain', 'a new blog Checking out a new blog by Stack Overflow added!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('#allBlogs').contains('Blog Title: Checking out a new blog - written by: Stack Overflow')
    })

    describe('with several blogs existing', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'Testing #1', author: 'Buggy #1', url: 'www.google.com/1' })
        cy.createBlog({ title: 'Testing #2', author: 'Buggy #2', url: 'www.google.com/2' })
        cy.createBlog({ title: 'Testing #3', author: 'Buggy #3', url: 'www.google.com/3' })
      })

      it('can like a blog', function() {
        cy.contains('Testing #1').find('#viewButton').click()
        cy.contains('Testing #1').find('#likeButton').click()
        cy.contains('Testing #1').contains('Likes: 1')
      })

      it('can delete created blog', function() {
        cy.contains('Testing #1').find('#viewButton').click()
        cy.contains('Testing #1').find('#deleteBlog').click()
        cy.get('#allBlogs').should('not.contain', 'Testing #1')
      })

      it('can not delete others blog', function() {
        cy.contains('Logout').click()
        const user = {
          name: 'Sami',
          username: 'root',
          password: 'alpha'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: user.username, password: user.password })

        cy.contains('Testing #1').find('#viewButton').click()
        cy.contains('Testing #1').should('not.contain', 'delete')
      })

      it.only('blogs are ranked according to likes', function() {
        // Open the divs
        cy.contains('Testing #1').find('#viewButton').click()
        cy.contains('Testing #2').find('#viewButton').click()
        cy.contains('Testing #3').find('#viewButton').click()

        // Add accessors
        cy.contains('Testing #1').find('#likeButton').as('theFirstButton')
        cy.contains('Testing #2').find('#likeButton').as('theSecondButton')
        cy.contains('Testing #3').find('#likeButton').as('theThirdButton')

        // Click on like to ensure order
        cy.get('@theFirstButton').click()
        cy.wait(500)
        cy.get('@theFirstButton').click()
        cy.wait(500)
        cy.get('@theFirstButton').click()
        cy.wait(500)
        cy.get('@theSecondButton').click()
        cy.wait(500)
        cy.get('@theSecondButton').click()
        cy.wait(500)
        cy.get('@theThirdButton').click()
        cy.wait(500)

        // Start of with highest likes
        let likes = 3

        // Go through like divs o check like count
        cy.get('.likeInfo').each(($el) => {
          if ($el.length === 1) {
            // Check if like counts matchs in descending order
            cy.wrap($el).contains(likes)
            likes = likes - 1
          }
        })

      })
    })
  })
})