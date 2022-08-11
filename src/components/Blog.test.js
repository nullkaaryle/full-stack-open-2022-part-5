import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from './Blog'
import { BlogForm } from './BlogForm'
import testService from '../services/tests'


describe('TESTS FOR COMPONENTS: BLOG, BLOGDETAILS AND BLOGFORM', () => {

  test('blog title button is rendered', () => {

    const { container } = render(<Blog
      blog={testService.blog}
      user={testService.loggedInUser}
    />)

    const div = container.querySelector('.blogTitleButton')
    expect(div).toHaveTextContent('Canonical string reduction')

  })


  test('blog title is rendered, but author, url, likes and name of user are not rendered', () => {

    render(<Blog
      blog={testService.blog}
      user={testService.loggedInUser}
    />)

    const title = screen.getByText('Canonical string reduction')
    expect(title).toBeDefined()

    const author = screen.queryByText('Edsger W. Dijkstra')
    expect(author).toBeNull()

    const url = screen.queryByText('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
    expect(url).toBeNull()

    const likes = screen.queryByText('5')
    expect(likes).toBeNull()

    const userName = screen.queryByText('Linda Usbport')
    expect(userName).toBeNull()

  })


  test('clicking the blog title button shows all the blog details', async () => {

    render(
      <Blog
        blog={testService.blog}
        user={testService.loggedInUser}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('Canonical string reduction')
    await user.click(button)

    const title = screen.getByText('Canonical string reduction')
    expect(title).toBeDefined()

    const author = screen.getByText('Edsger W. Dijkstra')
    expect(author).toBeDefined()

    const url = screen.getByText('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
    expect(url).toBeDefined()

    const likes = screen.getByText('5')
    expect(likes).toBeDefined()

    const userName = screen.getByText('Linda Usbport')
    expect(userName).toBeDefined()
  })


  test('like button is rendered in blog details for every user, but remove button is not', async () => {

    render(
      <Blog
        blog={testService.blog}
        user={testService.loggedInUser}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('Canonical string reduction')
    await user.click(button)

    const likeButton = screen.getByText('LIKE')
    expect(likeButton).toBeDefined()

    const removeButton = screen.queryByText('REMOVE')
    expect(removeButton).toBeNull()

  })


  test('remove button is rendered in blog details if logged in user is blog owner', async () => {

    render(
      <Blog
        blog={testService.blog}
        user={testService.loggedInUserAndBlogOwner}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('Canonical string reduction')
    await user.click(button)

    const removeButton = screen.getByText('REMOVE')
    expect(removeButton).toBeDefined()
  })


  test('submitting the blog form calls blog creation function once', async () => {

    const mockHandler = jest.fn()

    render(
      <BlogForm
        createBlog={mockHandler}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('SAVE BLOG')
    await user.click(button)

    expect(mockHandler).toBeCalledTimes(1)

  })


})
