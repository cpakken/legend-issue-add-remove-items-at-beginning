import { For, observer, useObserveEffect } from '@legendapp/state/react'
import { $, type Item$ } from './state'
import { memo } from 'react'

export const App = observer(() => {
  console.log('App render')

  // useObserveEffect(
  //   () => $,
  //   (e) => {
  //     console.log('items', e.value)
  //   }
  // )

  return (
    <div className="flex items-start gap-4 font-mono p-4">
      <div className="p-4 flex flex-col">
        {/* ONLY THIS CASE WORKS */}
        {/* <For each={$.store}>{(item$) => <Item item$={item$} />}</For> */}

        {/* <For each={$.store} optimized>
          {(item$) => <Item item$={item$} />}
        </For> */}

        <For each={$.list}>{(item$) => <Item item$={item$} />}</For>

        {/* <For each={$.list} optimized>
          {(item$) => <Item item$={item$} />}
        </For> */}

        {/* NORMAL RE-RENDER */}
        {/* {$.list.map((item$) => (
          <Item key={item$.id.peek()} item$={item$} />
        ))} */}
      </div>
      <AddButton />
    </div>
  )
})

const Item = memo(({ item$ }: { item$: Item$ }) => {
  return (
    <div
      className="flex flex-col cursor-pointer hover:bg-red-600 p-2"
      onClick={() => {
        console.log('delete', item$.id.get())
        item$.delete()
      }}
    >
      <div>ID: {item$.id.peek()}</div>
    </div>
  )
})

const AddButton = memo(() => {
  return (
    <div
      className="cursor-pointer p-4 bg-blue-600"
      onClick={() => {
        //Typing Error when Return Observable
        // @ts-expect-error
        const item$ = $.addItem()
        console.log('add', item$.get())
      }}
    >
      Add Item
    </div>
  )
})
