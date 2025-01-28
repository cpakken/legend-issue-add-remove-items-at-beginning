import { observable } from '@legendapp/state'
import { test } from 'bun:test'

test('legend nodes', () => {
  // const c$ = observable({ foo: 'bar' })
  const c$ = { foo: 'bar' }
  const $ = observable({ a: { b: { c: c$ } } })
  console.log($.a.peek())

  $.a.b.assign({ c: { foo: 'baz' } })
  $.a.b.c.delete()

  // console.log(getNode($.a.b.c))
  // console.log(getNode(c$).parent)
  // getNode($.a.b.c).proxy.delete()
  console.log($.a.peek())

  // console.log(getParent($.a.b) === $.a)

  // console.log(getNode($.a.b))
})
