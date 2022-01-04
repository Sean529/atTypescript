export { }
// ________________________________________________________________

// 通过关键字 typeof instanceof for in 来缩小范围
function double(input: number | string) {
	if (typeof input === 'string') {
		console.log(input);
	} else if (typeof input === 'number') {
		console.log(input);
	}
}

class Animal {

}

class Bird extends Animal {

}

class Dog extends Animal {

}

function getName(animal: Animal) {
	if (animal instanceof Bird) {
		console.log(animal);
	} else if (animal instanceof Dog) {
		console.log(animal);
	}
}

// ________________________________________________________________
// null 保护
function getFirstLetter(s: string | null) {
	// 方法1
	// if (s === null) {
	// 	return ''
	// }

	// 方法2
	// s = s || ''

	// 该方法不行
	// function log() {
	// 	s = s || ''
	// }
	// log()

	// ! 的情况如果是 null 会报错
	return s!.charAt(0)
}

// ________________________________________________________________
// 链判断运算符
const a = { b: 2 }
const result = a?.b

const x = 'c'
a?.[x]
// a?.[x]() // 报错

// ________________________________________________________________
// 可辨识的联合类型
interface WarningButton {
	class: 'waring',
	text: '修改'
}

interface DangerButton {
	class: 'danger',
	text: '删除'
}

function getButton(button: WarningButton | DangerButton): void {
	if (button.class === 'waring') {
		console.log(button);
	} else if (button.class === 'danger') {
		console.log(button);
	}
}

interface User {
	username: string
}

type Action = {
	type: 'add',
	payload: User
} | { type: 'delete', payload: number }

const reduce = (action: Action) => {
	switch (action.type) {
		case 'add':
			action.payload.username
			break
		case 'delete':
			const id: number = action.payload
			break
	}
}

interface Bird {
	swing: number
}
interface Dog {
	leg: number
}

function getNumber(x: Bird | Dog) {
	if ('swing' in x) {
		console.log(x);
	} else {
		console.log(x);
	}
}

// ________________________________________________________________
// 自定义类型保护（有难度！！）
// 1. 是一个表达式
// 在运行时进行类型检查
// 保证在某个作用域内是符合预期的 

interface Bird {
	leg: number
}

interface Dog {
	leg: number
}

// 类型谓词，自定义表达式
function isBird(x: Bird | Dog): x is Bird {
	return x.leg === 2
}

function getAnimal(x: Bird | Dog) {
	if (isBird(x)) {
		console.log(x);
	} else {
		console.log(x);
	}
}

// ________________________________________________________________
// unknown any 的安全类型
// any 任何类型都可以归为any类型，全局超级类型，任何类型的子类型，可以对any进行任何操作，而不需要检查类型
let value: any
value = true
value = 1
value = []

value()
value.foo()
value.length

let v: unknown // 任何类型可以赋予 unknown 类型
v = true
v = 1
v = []

v = '123';
// 断言
(v as string).length
// typeof
if (typeof v === 'string') {
	console.log(v.length);
}

// 联合类型中 unknown 不管跟谁联合，最后都是 unknown
type U1 = unknown | null
type U2 = unknown | undefined
type U3 = unknown | String
type U4 = unknown | number[]

// 交叉类型
interface A { name: string, c: number }
interface B { age: number, c: number }

let aa: A
let bb: B
// 既属于 A 也属于 B
type C = A & B
// 拥有 A 和 B 的所有特性，对象只都不少
let c: C = { name: 'at', age: 18, c: 18 }

aa = c
bb = c

type AA = string | number
type BB = string | boolean
// 子类型，既能赋值给 AA，也能赋值给 BB
type CC = AA & BB // string

// never 是 unknown 子类型
type isNever = never extends unknown ? true : false
type keys = keyof unknown // unknown 不知道是什么类型，所以是 never

// unknown 只能进行比较，其他操作都不行
let aaa: unknown
let bbb: unknown
console.log(aaa === bbb);
console.log(aaa !== bbb);
// aaa + bbb

// 映射属性的时候
type getType<T> = {
	[P in keyof T]: number
}

type t = getType<unknown>