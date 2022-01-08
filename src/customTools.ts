export { }
// ________________________________________________________________
// 自定义工具类型
// github 自定义工具类型库 utility-types

// ________________________________________________________________
// proxy

type Proxy<T> = {
	get(): T
	set(value: T): void
}

type Proxify<T> = {
	[P in keyof T]: Proxy<T[P]>
}

// TODO: proxify<T> 泛型
function proxify<T>(obj: T): Proxify<T> {
	let result = <Proxify<T>>{}
	for (const key in obj) {
		Object.defineProperty(result, key, {
			get: () => obj[key],
			set: (value) => obj[key] = value
		})
	}
	return result
}
interface Props { name: string, age: number }
const props: Props = { name: 'at', age: 18 }
const proxyProps = proxify<Props>(props) // 调用 proxify 函数它的类型是 Props
const name = proxyProps.name
// proxyProps.name = 'AT'
console.log('%c AT-[ name ]-33', 'font-size:13px; background:#de4307; color:#f6d04d;', name)

// ________________________________________________________________
// unProxify
function unProxify<T>(t: Proxify<T>): T {
	let result: any = {} as T
	for (const key in t) {
		result[key] = t[key]
	}
	return result
}

const newObj = unProxify(proxyProps)
newObj.name = 'at'
console.log('%c AT-[ newObj.name ]-48', 'font-size:13px; background:#de4307; color:#f6d04d;', newObj.name)

// ________________________________________________________________
// 差集 A-B // 留下 B 上没有的
export type SetDifference<A, B> = A extends B ? never : A

type A = string | number
type B = number | Boolean
type AB = SetDifference<A, B> // string

// ________________________________________________________________
// Omit // 忽略
// keyof T = name|age|visible
// K = age
// SetDifference name | visible
// {name:string, visible:boolean}
type Omit<T, K extends any> = Pick<T, SetDifference<keyof T, K>>

type Props1 = { name: string, age: number, visible: boolean }
type OmitAgeProps = Omit<Props1, 'age'> // {name:string, visible:boolean}

// ________________________________________________________________
// Diff
namespace na {
	type Props1 = { name: string, age: number, visible: boolean }
	type DefaultProps = { age: number }
	type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>
	type DiffProps = Diff<Props1, DefaultProps> // {name:string, visible: boolean}
}

// ________________________________________________________________
// InterSection 交叉属性
namespace nb {
	type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>
	type Props1 = { name: string, age: number, visible: boolean }
	type DefaultProps = { age: number }
	type DuplicateProps = InterSection<Props1, DefaultProps>
}

// ________________________________________________________________
// Overwrite 重写，TS源码中是把已有的属性覆盖，新增的属性丢弃
namespace nc {
	type OldProps = { name: string, age: number, visible: boolean }
	type NewProps = { age: string, other: string }
	type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>
	type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>
	// Diff {name:string, visible: boolean}
	// &
	// InterSection {age: string}
	type Overwrite<T extends object, U extends object, I = Diff<T, U> & InterSection<U, T>> = Pick<I, keyof I>
	type ReplaceProps = Overwrite<OldProps, NewProps> // {name:string, age:string, visible:string}
}
namespace nc1 {
	type OldProps = { name: string, age: number, visible: boolean }
	type NewProps = { age: string, other: string }
	type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>
	// Diff {name:string, visible: boolean} & U
	type Overwrite<T extends object, U extends object, I = Diff<T, U> & U> = Pick<I, keyof I>
	type ReplaceProps = Overwrite<OldProps, NewProps> // {name:string, age:string, visible:string, other: string}
}

// ________________________________________________________________
// Merge 合并，把两个对象的属性合并
type O1 = {
	id: number
	name: string
}

type O2 = {
	id: number
	age: number
}

type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] }
type R1 = Compute<string>
type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>>
type R2 = Merge<O1, O2>