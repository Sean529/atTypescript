export { }
// ________________________________________________________________
// 内置工具类型
// partial 部分的
interface A {
	a: string
	b: number
	c: boolean
}
type Partial<T> = {
	[P in keyof T]?: T[P]
}
type PartialA = Partial<A>
const a: PartialA = { a: '' }

// ________________________________________________________________
// 递归 Partial
interface Company {
	id: number
	name: string
}
interface Person {
	id: number
	name: string
	company: Company
}

// 递归
type DeepPartial<T> = {
	[U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}

// 非必填
type PartialPerson = DeepPartial<Person>
const p: PartialPerson = {
	id: 1,
	name: 'at',
	company: {
		name: 'code'
	}
}
// ________________________________________________________________
// 把非必填变为必填
namespace aa {
	interface Person {
		name: string
		age?: number
	}
	type Required<T> = {
		[P in keyof T]-?: T[P] // -? 必选 / +? 可选
	}
	type RequiredPerson = Required<Person>
	const p: RequiredPerson = {
		name: 'at',
		age: 18
	}
}

// ________________________________________________________________
// 只读
namespace aa1 {
	interface Person {
		name: string
		age?: number
	}
	type Readonly<T> = {
		readonly [P in keyof T]: T[P] // 只读
	}
	type ReadOnlyPerson = Readonly<Person>
	const p: ReadOnlyPerson = {
		name: 'at',
		age: 18
	}
	// p.name = 'moore'
	// p.age = 20
}

// ________________________________________________________________
// Pick // 提取子类型
namespace namespaceC {
	interface Person {
		name: string
		age: number
		gender: number
	}
	const person: Person = { name: 'at', age: 11, gender: 1 }
	type keyOfPerson = keyof Person // 'name'|'age'|'gender'
	type Pick<T, K extends keyof T> = {
		[P in K]: T[P]
	}
	type PickPerson = Pick<Person, 'name' | 'age'>

	// Extract
	type Extract<T, U> = T extends U ? T : never
	// 有条件的分发
	type E = Extract<string | number | boolean, string | number>
	const e: E = '1'
}

// ________________________________________________________________
// Record // 记录，用于对象，表示 key value 的类型
namespace namespaceD {
	type KeyOfAny = keyof any; // string | number | symbol
	// 表示K的类型是 KeyOfAny 的联合类型的子类型
	type Record<K extends keyof any, T> = {
		[P in K]: T; // P 是遍历 K
	}

	const obj1: Record<string, string | number> = { name: 'at', age: 18 }

	function mapObject<K extends string | number, T, U>(obj: Record<K, T>, fn: (x: T) => U) {
		let result: Record<K, U> = <Record<K, U>>{}
		for (const key in obj) {
			result[key] = fn(obj[key])
		}
		return result
	}
	const obj = { count1: 1, count2: 2 }
	const map = (x: number): string => x * 2 + ''
	const o = mapObject<string | number, number, string>(obj, map) // { count1: 2, count2: 4}
}