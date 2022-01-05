export { }
// ________________________________________________________________
// 内置条件类型
interface Fish {
	name1: string
}
interface Water {
	name2: string
}
interface Bird {
	name3: string
}
interface Sky {
	name4: string
}

type Condition<T> = T extends Fish ? Water : Sky
const con: Condition<Fish> = { name2: '水' }

// ________________________________________________________________
// 条件类型分发(分布式有条件类型)，但是分布式有条件类型的前提是，条件类型里待检查的类型必须是 naked type parameter
type Condition1<T> = { t: T } extends { t: Fish } ? Water : Sky
const con1: Condition1<Fish | Bird> = { name4: '' }
const con2: Condition1<Fish | Bird> = { name4: '' }

// ________________________________________________________________
// 找出T中不包含U的部分
type Diff<T, U> = T extends U ? never : T
type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>
type R2 = never | never | never | 'd'
type R3 = 'd'

type Filter<T, U> = T extends U ? T : never
type R4 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>
type R5 = 'a' | 'b' | 'c' | never
type R6 = 'a' | 'b' | 'c'

// ________________________________________________________________
// 内置条件类型
// Exclude
type Exclude<T, U> = T extends U ? never : T
type R7 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>

// ________________________________________________________________
// Extract
type Extract<T, U> = T extends U ? T : never;
type R8 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>

// ________________________________________________________________
// NonNullable
type NonNullable<T> = T extends null | undefined ? never : T
type R9 = NonNullable<'a' | null | undefined>

// ________________________________________________________________
// ReturnType
// infer 推断，取参数类型的某一部分
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T

function getUser(n: string, a: number) {
	return { name: 'at', age: 18 }
}

// const t = getUser()

type GetUserType = typeof getUser
type ReturnUser = ReturnType<GetUserType>
const u: ReturnUser = {
	name: 'at', age: 18
}

type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
type ParamsType = Parameters<GetUserType>
const p: ParamsType = ['at', 18]

// ________________________________________________________________
// InstanceType
class Person8 {
	name: string
	constructor(name: string) {
		this.name = name
	}
	getName() { console.log(this.name) }
}

type ConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never

type Params = ConstructorParameters<typeof Person8>
const p1: Params = ['at']

type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
type Person8Instance = InstanceType<typeof Person8>
const instance: Person8Instance = {
	name: 'at',
	getName() { }
}

// ________________________________________________________________
// infer 应用案例
// tuple 转 union
type ElementOf<T> = T extends Array<infer E> ? E : never
type Ttuple = [string, number]
type TupleToUnion = ElementOf<Ttuple> // string | number

// ________________________________________________________________
// 联合类型转成交叉类型
// string | number => string & number

type T1 = { name: string }
type T2 = { age: number }
type ToIntersection<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never
type T3 = ToIntersection<{ a: (x: T1) => void, b: (x: T2) => void }>
// T1 & T2 交集，交叉类型
const t33: T3 = { name: 'at', age: 18 }