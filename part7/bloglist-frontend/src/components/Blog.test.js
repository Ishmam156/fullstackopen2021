import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog /> Component', () => {

  let component
  let setBlogs
  let updateBlog

  const blog = {
    user: '5a43e6b6c37f3d065eaaa581',
    likes: 1,
    author: 'Aazu',
    title: 'Little Grumpy',
    url: 'https://www.youtube.com/2000'
  }

  beforeEach(() => {
    setBlogs = jest.fn()
    updateBlog = jest.fn()

    component = render(
      <Blog blog={blog} blogs={[]} setBlogs={setBlogs} updateBlog={updateBlog} />
    )
  })

  test('Blog renders title and author also does not show url and likes', () => {

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    const hiddenDefault = component.container.querySelector('.hiddenDefault')
    expect(hiddenDefault).toHaveStyle('display: none')

  })

  test('Blog url and likes are shown when button is clicked', () => {

    let hiddenDefault = component.container.querySelector('.hiddenDefault')
    expect(hiddenDefault).toHaveStyle('display: none')

    const toggleButton = component.getByText('view')
    fireEvent.click(toggleButton)

    hiddenDefault = component.container.querySelector('.hiddenDefault')
    expect(hiddenDefault).not.toHaveStyle('display: none')

  })

  // test('if like button is clicked twice, the setBlogs get called twice', () => {

  //   const toggleButton = component.getByText('like')

  //   fireEvent.click(toggleButton)

  //   expect(updateBlog.mock.calls).toHaveLength(1)

  // })

})
