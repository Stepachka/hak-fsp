import { AsyncLocalStorage } from 'async_hooks'

export class AsyncContext<K = unknown, V = unknown> implements Map<K, V> {
  constructor(protected readonly als: AsyncLocalStorage<Map<K, V>>) {}

  private getStore(): Map<K, V> {
    const store = this.als.getStore()

    if (store === undefined)
      throw new Error(
        'AsyncContext was not registered, call .register() or .run() before calling this method!'
      )

    return store
  }

  public clear(): void {
    return this.getStore().clear()
  }

  public delete(key: K): boolean {
    return this.getStore().delete(key)
  }

  public forEach(
    callback: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void {
    return this.getStore().forEach(callback, thisArg)
  }

  public get(key: K): V | undefined {
    return this.getStore().get(key)
  }

  public has(key: K): boolean {
    return this.getStore().has(key)
  }

  public set(key: K, value: V): this {
    this.getStore().set(key, value)
    return this
  }

  public get size(): number {
    return this.getStore().size
  }

  public entries(): IterableIterator<[K, V]> {
    return this.getStore().entries()
  }

  public keys(): IterableIterator<K> {
    return this.getStore().keys()
  }

  public values(): IterableIterator<V> {
    return this.getStore().values()
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.getStore()[Symbol.iterator]()
  }

  [Symbol.toStringTag] = '[object AsyncContext]'

  public register(): void {
    this.als.enterWith(new Map<K, V>())
  }

  public run<R, TArgs extends any[]>(
    callback: (...args: TArgs) => R,
    ...args: TArgs
  ): R {
    return this.als.run<R, TArgs>(new Map<K, V>(), callback, ...args)
  }

  public unregister(): void {
    this.als.disable()
  }
}
