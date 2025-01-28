import { observable, type Observable } from '@legendapp/state'

interface Item {
  id: string
}

interface Store {
  store: Record<string, Item>

  list: Item[]

  //Typing Error when Return Observable (It thinks its a computed reference an observable?)
  addItem: () => Item$
}

export type Item$ = Observable<Item>

let id = 1000
//Decrement Ids to test adding items at the beginning of the list
export const genId = () => `${id--}`

const createItem = () => ({ id: genId() })

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
