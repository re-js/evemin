import { event, listen } from '.'

// stack

const stack: number[] = []
const push_stack = stack.push.bind(stack)
const pop_stack = stack.pop.bind(stack)

// test

test('listen', () => {
  const ev = event<number>()

  listen(ev, push_stack)
  
  ev(10)
  expect(pop_stack()).toBe(10)
  
  ev(10)
  expect(pop_stack()).toBe(10)
  
  listen(ev, (v) => {
    if (v === 1) {
      const unlisten = listen(ev, (v) => {
        if (v === 2) unlisten()
        else push_stack(100)
      })
    }
  })
  
  ev(10)
  expect(pop_stack()).toBe(10)
  
  ev(1)
  expect(pop_stack()).toBe(1)
  
  ev(10)
  expect(pop_stack()).toBe(100)
  expect(pop_stack()).toBe(10)
  
  ev(2)
  expect(pop_stack()).toBe(2)
  
  ev(10)
  expect(pop_stack()).toBe(10)
})

test('unlisten', () => {
  const ev = event<number>()

  const unlisten = listen(ev, push_stack)

  ev(10)
  ev(10)
  expect(pop_stack()).toBe(10)
  expect(pop_stack()).toBe(10)

  unlisten()

  ev(10)
  ev(10)
  expect(stack.length).toBe(0)
})