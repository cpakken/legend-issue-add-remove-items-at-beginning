## ISSUES Deletng and Inserting Items in Beginning of List

This repos is a minimal reproduction for rendering items

- Add button adds an item with id / key that decrements to test adding items at the beginning of the list
- Manually click on the items in the beginning of the list to delete

```ts

interface Item {
  id: string
}


interface Store {
  store: Record<string, Item>
  list: Item[]
  addItem: () => Item$
}

type Item$ = Observable<Item>

export const $ = observable<Store>({
  store: {
    a: { id: 'a' },
    b: { id: 'b' },
    c: { id: 'c' },
  },

  list: () => Object.values($.store),

  addItem: (): Item$ => {
    const item = createItem()
    $.store[item.id].set(item)
    return $.store[item.id]
  },
})


let id = 1000
//Decrement Ids to test adding items at the beginning of the list
export const genId = () => `${id--}`

const createItem = () => ({ id: genId() })
  
```

- Different rendering methods are tested
- Please toggle comments in App.tsx to test different cases

```tsx
        //ONLY THIS CASE WORDS
        <For each={$.store}>{(item$) => <Item item$={item$} />}</For>

        //NOT WORKING
        <For each={$.store} optimized>
          {(item$) => <Item item$={item$} />}
        </For>

        //NOT WORKING
        <For each={$.list}>{(item$) => <Item item$={item$} />}</For>

        //NOT WORKING
        <For each={$.list} optimized>
          {(item$) => <Item item$={item$} />}
        </For>

        //NORMAL REACT RE-RENDER (with observer() HOC) NOT WORKING
        $.list.map((item$) => (
          <Item key={item$.id.peek()} item$={item$} />
        ))

```

All these cases should render correctly when adding and deleting items at the beginning of the list
