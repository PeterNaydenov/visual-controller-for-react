import { beforeAll, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { Window } from 'happy-dom'

beforeAll(() => {
  const window = new Window()
  global.window = window
  global.document = window.document
})

afterEach(() => {
  cleanup()
})
