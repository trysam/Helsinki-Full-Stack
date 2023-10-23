import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const { container } = render(<Note note={note} />)

  const div = container.querySelector('.note')

  expect(div).toHaveTextContent('Component testing is done with react-testing-library')

  screen.debug(div)

  //const element = screen.getByText('Component testing is done with react-testing-library')
  //expect(element).toBeDefined()
})

test('click the button calls event handler once', async () => {

  const note = {
    content: 'Component testing is done  with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  render(
    <Note note={note} deleteNote={mockHandler} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('DeleteNote')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})