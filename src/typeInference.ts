export { }
// ________________________________________________________________
// 类型推断
// 变量的类型由定义推断，从右向左流动
const foo = '123'
const bar = true

// ________________________________________________________________
// 通过 return 推断返回值的类型
// 底部流出
function add(a: number, b: number) {
	return a + b + ''
}
const c = add(1, 2)

// ________________________________________________________________
// 从左向右流动
type Sum = (a: number, b: number) => number
const sum: Sum = (a, b) => a + b // a 和 b 的类型由 Sum 推断出来

// ________________________________________________________________
// 解构
const person = {
	name: 'at', age: 18
}
const { name, age } = person

const numbers = [1, 2, 3]
const c2 = numbers[0]

// ________________________________________________________________
interface DefaultProps {
	name?: string
	age?: number
}

const defaultProps: DefaultProps = {
	name: 'at', age: 18
}

const props = {
	...defaultProps,
	home: 'sh'
}

type Props = typeof props

// ________________________________________________________________
// number + any = any
function addOne(a: any) {
	return a + 1
}

function sum3(a: number, b: number) {
	// return a + addOne(b)
	return a + addOne(b) as number // 强制转换为 number
}

let k = sum3(1, 2) // any

// ________________________________________________________________
interface Bird {
	name: string
	fly(): void
}
interface Person {
	talk(): void
}

type BirdPerson = Bird & Person

let p1: BirdPerson = {
	name: 'tianshi',
	fly() { },
	talk() { }
}

// ________________________________________________________________
// 联合类型的交叉类型
type T1 = string | number
type T2 = number | boolean
type T3 = T1 & T2 // number // 交叉类型
type T4 = T1 | T2 // string | number | boolean // 联合类型

const t3: T3 = 123
const t4: T4 = true // 123, '1234', false 

// ________________________________________________________________
// mixin
function mixin<T, U>(one: T, two: U): (T & U) {
	const result = <(T & U)>{}
	for (let key in one) {
		(result as T)[key] = one[key] // 断言
	}
	for (let key in two) {
		(<U>result)[key] = two[key] // 断言2
	}
	return result
}
const x = mixin({ name: 'at' }, { age: 18 })