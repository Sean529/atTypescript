// ________________________________________________________________
// 兼容性
// 1. 如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
// 2. 原理是 Duck-Check，就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的

// ________________________________________________________________
// 接口兼容
export { }
interface Animal {
	name: string
	age: number
}
interface Person {
	name: string
	age: number
	gender: number
}
// 要判断目标类型 Person 是否能够兼容输入的源类型 Animal
function getName(animal: Animal): string { return animal.name }
const p = {
	name: 'at',
	age: 10,
	gender: 0
}
getName(p)
const a: Person = {
	name: 'at',
	age: 18,
	gender: 0
}
getName(a)
// ________________________________________________________________
// 基本数据类型的兼容性
let num: string | number
let str: string = 'at'
// str = num // 检查不通过，num 的类型超出 str 上的类型
num = str // str 类型符合 num 的类型兼容性检查

let num2: {
	toString(): string
}
let str2: string = 'at'

// str2 = num2 // 不能将 string 分配给 num2，因为 str2 上还有很多 num2 上没有的属性比如 length
num2 = str2

// ________________________________________________________________
// 兼容性检查，为什么该有的属性没有就检查不通过，因为没有可能会出错，比如 num2 上没有 length，但是检查通过后在使用 length 时就出错了

namespace ab {
	class Animal { name: string }
	class Bird extends Animal { age: number }
	let a: Animal = { name: 'at' }
	let b: Bird = { name: 'at', age: 18 }
	a = b // b 的形状包含 a 的形状，所以把 b 赋值给 a 是安全的
	// b = a // a 中没有 b 的(age)形状，赋值会出错
}

// ________________________________________________________________
// 1.函数的兼容性
// 比较参数
type Func = (a: number, b: number) => void
let sum: Func
function f1(a: number, b: number): void { }
sum = f1
// 参数少一个可以
function f2(a: number): void { }
sum = f2
// 参数少两个也可以
function f3(): void { }
sum = f3
// 参数多了不行
function f4(a: number, b: number, c: number): void { }
// sum = f4
sum(1, 2) // sum 的类型定义是 Func 只接收两个参数，如果赋值的函数参数超过2个则接收不了会报错

// ________________________________________________________________
// 2.函数的兼容性
// 比较返回值
type GetPerson = () => { name: string, age: number }
let getPerson: GetPerson

function g1() {
	return { name: 'at', age: 18 }
}
getPerson = g1

function g2() {
	return { name: 'at', age: 18, gender: 0 }
}
getPerson = g2

function g3() {
	return { name: 'at' }
}
// getPerson = g3 // 返回值中的属性少于类型声明 不行

// ________________________________________________________________
//NOTE: 一切的一切是为了类型安全，为了使用的时候不报错
// 返回值类型是协变的，而参数类型是逆变的
// 返回值类型可以传子类，参数类型可以传父类
// 返回值协变子类，参数逆变父类
class Animal { }
class Dog extends Animal {
	public name: string = 'Dog'
}
class BlackDog extends Dog {
	public age: number = 10
}
class WhiteDog extends Dog {
	public home: string = 'sh'
}
let animal: Animal
let dog: Dog
let blackDog: BlackDog
let whiteDog: WhiteDog
type Callback = (dog: Dog) => Dog
function exec(callback: Callback): void {
	// callback(whiteDog)
}
/**
 * 4种情况
 * 1. 参数传子类返回值子类
 * 2. 参数传子类返回值父类
 * 3. 参数传父类返回值父类
 * 4. 参数传父类返回值子类
 */

type ChildToChild = (blackDog: BlackDog) => BlackDog
let childToChild: ChildToChild
exec(childToChild)

type ChildToParent = (blackDog: BlackDog) => Animal
let childToParent: ChildToParent
exec(childToParent)

type ParentToParent = (animal: Animal) => Animal
let parentToParent: ParentToParent
exec(parentToParent)

type ParentToChild = (animal: Animal) => BlackDog
let parentToChild: ParentToChild
exec(parentToChild)

// TODO: 协变、逆变不理解
// 只有父到子是可以的，也就是说，入参是父，返回值是子
// 入参比返回值的类型多才行，TS 为了保证不出错

// ________________________________________________________________
// 泛型兼容性
interface Empty<T> {
	data: T // 没有这行时，Empty 没有返回值 y = x 可以，但是有了 data 后不行，因为返回值变成了 {data: string} / {data: number}
}

let x: Empty<string> // {data: string}
let y: Empty<number> // {data: number}
// y = x

// ________________________________________________________________
// 数字和枚举兼容
enum Colors { Red, Green, Blue }
let c: Colors
c = Colors.Red
c = 1
let n: number
n = 1
n = Colors.Red