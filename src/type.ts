// 类型别名
type Cart<T> = { list: T[] } | T[] // 联合类型
const c1: Cart<string> = { list: ['1'] }
const c2: Cart<number> = [1, 2, 3]