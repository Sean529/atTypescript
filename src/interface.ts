export { }
// ________________________________________________________________
// 接口
/**
 * 1. 接口一方面可以在面相对象编程中表示为行为的抽象，另外可以用来描述对象的形状
 * 2. 接口就是把一些类中共有的属性和方法抽象出来，可以用来约束实现此接口的类
 * 3. 一个类可以继承另一个类并实现多个接口
 * 4. 接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
 * 5. 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类可以有多个子类，但只能有一个父类
 */

interface Speakable {
	name: string
	speak(): void
}

const speakMan: Speakable = {
	name: 'AT',
	speak(): void { }
}

// 行为抽象
// 同名的接口可以写多个，类型会自动合并
interface Speakable {
	speak(): void
}

interface Eatable {
	eat(): void
}

// 接口是面向对象编程中的行为抽象，类需要实现所有接口的属性和方法
class Person implements Speakable, Eatable {
	name: string
	speak(): void {
		throw new Error("Method not implemented.")
	}
	eat(): void {
		throw new Error("Method not implemented.")
	}
}

// ________________________________________________________________
// 任意属性
interface Person2 {
	readonly id: number
	name: string
	[key: string]: any
}

const p: Person2 = {
	id: 1,
	name: "at",
	age: 10
}

// ________________________________________________________________
// 接口继承

interface Speakable2 {
	speak(): void
}

interface SpeakChinese extends Speakable2 {
	speakChinese(): void
}

class ChineseMan implements SpeakChinese {
	speakChinese(): void {
		throw new Error("Method not implemented.")
	}
	speak(): void {
		throw new Error("Method not implemented.")
	}
}

// ________________________________________________________________
// 只读,不允许修改
interface Person3 {
	readonly id: number
}

const p3: Person3 = {
	id: 1
}
// p3.id = 2 // 报错

// ________________________________________________________________
// 函数接口
interface Discount {
	(price: number): number
}

const discount: Discount = (price: number): number => {
	return price * 0.8
}

// ________________________________________________________________
// 可索引接口
// 对数组和对象进行约束
interface User {
	[key: number]: string
}

const user: User = {
	0: 'AT',
}
const arr: User = ['1', '2', '3']

// ________________________________________________________________
// 如何用接口约束类

interface Speakable3 {
	speak(): void
}

class SpeakableChinesMan implements Speakable3 {
	speak(): void { }
}

// ________________________________________________________________
// 构造函数类型
class Animal {
	constructor(public name: string) { }
}
// 加上 new 之后就是用来描述构造函数类型
interface WithNameClass {
	new(name: string): any
}
function createClass(calzz: WithNameClass, name: string) {
	return new calzz(name)
}
const a = createClass(Animal, 'at')
console.log(a.name);

// ________________________________________________________________
/**
 * 当我们写一个类的时候，会得到两个类型
 * 1. 构造函数类型的函数类型
 * 2. 类的实例类型
 */
// TODO: 重点知识

namespace g {
	class Component {
		static myName: string = '静态名称属性'
		myName: string = '实例名称属性'
	}
	// Component 类名本身表示的是实例的类型
	// ts 1.一个类型 2.一个值
	// 1. 放在冒号后面的是类型
	// 2. 放在 = 号后面是值
	const c: Component = { myName: '实例名称属性' }
	// TS 中 typeof 是获取函数的类型
	const f: typeof Component = Component
}

namespace b {
	function Component {
		this.myName = '实例名称属性'
	}
	Component.myName = '静态名称属性'
	const com = Component
	// TS 中 typeof 是获取函数的类型
	const f: typeof Component = com
}

// ________________________________________________________________
// 描述函数
interface Type1 {
	(name: string): any
}
// 描述对象，对象中有 a 属性，值是一个箭头函数
interface Type2 {
	a: (name: string) => string
}

const type1: Type1 = (name: string) => { }

const type2: Type2 = {
	a: type1
}

// ________________________________________________________________
namespace t {
	// 描述函数
	interface Type1 {
		(name: string): any
		age: number
	}
	// 描述对象，对象中有 a 属性，值是一个箭头函数
	interface Type2 {
		a: (name: string) => string
	}

	const type1: any = (name: string) => { }
	type1.age = 10
	const t: Type1 = type1

	const type2: Type2 = {
		a: type1
	}
}

// ________________________________________________________________
// 抽象类 vs 接口
// 1. 不同类之间公有的属性或方法，可以抽象成一个接口（interface）
// 2. 抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
// 3. 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述，既不提供方法的实现，也不为属性进行初始化
// 4. 一个类可以继承一个类或抽象类，但可以实现（implements）多个接口
// 5. 抽象类也可以实现接口