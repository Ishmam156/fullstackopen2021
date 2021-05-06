import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'

describe('<CreateBlog /> component testing', () => {

  test('form calls event handler it received with the right details when a new blog is created. ', () => {

    const setBlogs = jest.fn()
    const setMessage = jest.fn()
    const setMessageType = jest.fn()

    const component = render(
      <CreateBlog setBlogs={setBlogs} blogs={[]} setMessage={setMessage} setMessageType={setMessageType} clearForm={{}} />
    )
    expect(component.container).toHaveTextContent('author')
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'What is life' }
    })
    fireEvent.change(author, {
      target: { value: 'Ishu' }
    })
    fireEvent.change(url, {
      target: { value: 'www.google.com' }
    })

    fireEvent.submit(form)

    console.log(setBlogs.mock.calls)
  })

})
