import { type Observable, internal, observable } from '@legendapp/state'
import { weakMemo } from './weak-memo'

const { getNode, getProxy } = internal

//TODO depth param -> check if _root
export const parent$ = <T extends Observable<any>>(node: Observable<any>): T => {
  return getProxy(getNode(node).parent as any) as any
}

export const derive$ = <T extends Observable<any>, R>(
  create$: ($: T, parent$: <P extends Observable<any>>($: Observable<any>) => P) => R
): (($: T) => Observable<R>) => {
  return weakMemo(($: T): Observable<R> => {
    return observable(create$($, parent$))
  })
}
