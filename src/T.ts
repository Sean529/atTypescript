export { }
// ________________________________________________________________
// 泛型
// 创建一个长度为 length 的数组，里面的值用 value 填充，期望传入的 value 类型与返回的数组中元素的类型相同时，可以使用泛型
// T 就是 Type 的意思
function createArray<T>(length: number, value: T): Array<T> {
	const result: T[] = []
	for (let i = 0; i < length; i++) {
		result[i] = value
	}
	return result
}

const result = createArray<string>(3, '3') // 传入的类型与返回的类型一致，且在调用时确定返回值的类型
// console.log(result);

// ________________________________________________________________
// 类数组 TODO:
// function sum() {
// 	const args: IArguments = arguments
// 	console.log('%c AT-[ arguments ]-21', 'font-size:13px; background:#de4307; color:#f6d04d;', arguments)
// }
// sum(1, 2, 3)

// ________________________________________________________________
// 泛型类
class MyArray<T> { // 实例化时给类传入类型
	private list: T[] = [] // 私有属性 数组的元素类型取决于实例化时定义的类型
	add(value: T): void { // 添加的元素类型取决于实例化时定义的类型
		this.list.push(value)
	}
	get(): T { return this.list[0] } // 返回的类型取决于实例化时定义的类型
	getList(): T[] { return this.list }
}
const array = new MyArray<number>()
array.add(1)
array.add(2)
array.getList()

// console.log('%c AT-[ array.getList() ]-39', 'font-size:13px; background:#de4307; color:#f6d04d;', array.getList())
// console.log('%c AT-[ array.get() ]-38', 'font-size:13px; background:#de4307; color:#f6d04d;', array.get())

// ________________________________________________________________
// 泛型与new
/**
 *  构造函数工厂
 * @param type 构造函数 { new(): T }
 * @returns 实例
 */
function factory<T>(type: { new(): T }): T {
	return new type() // 返回 Person 类型
}
class Person { }
const p = factory<Person>(Person)
// console.log('%c AT-[ p ]-50', 'font-size:13px; background:#de4307; color:#f6d04d;', p)

// ________________________________________________________________
// 泛型接口
// 在函数调用时指定类型
interface Calculate {
	<T>(a: T, b: T): T
}
const sum: Calculate = function <T>(a: T, b: T): T {
	// return a + b // NOTE: a + b 无法相加，有可能传入的不是 number 类型，下一条解决这个问题
	return a
}
sum<number>(1, 2)

// 在函数定义时指定类型
interface Calculate2<T> {
	(a: T, b: T): T
}

const sum2: Calculate2<number> = function (a: number, b: number): number {
	return a + b
}
sum2(1, 2)

// <U> 在函数调用时指定类型，T和后面的U在函数定义时指定类型
interface Calculate3<T> {
	<U>(a: T, b: T): U
}
const sum3: Calculate3<number> = function <U>(a: number, b: number): U {
	return a as any
}

sum3<number>(1, 2)

// ________________________________________________________________
// 泛型可以写多个
function swap<A, B>(tuple: [A, B]): [B, A] {
	return [tuple[1], tuple[0]]
}
swap([1, 2])

// ________________________________________________________________
// 默认泛型
interface T2<T = string> {

}
type T22 = T2

// ________________________________________________________________
// 泛型约束
function logger<T>(val: T): void {
	// console.log(val.length) // T 可能是任意类型所以不支持调用 length
}
// 通过继承的 lengthWise 增加 length 属性
interface LengthWise {
	length: number
}

function logger2<T extends LengthWise>(val: T): void {
	// console.log('%c AT-[ val ]-113', 'font-size:13px; background:#de4307; color:#f6d04d;', val.length)
}

// logger2<number>('abc') // number 不满足约束 LengthWise，number 没有 length 属性
logger2<string>('abc') // string 满足 LengthWise

// 先定义变量，再反推类型
const obj = {
	length: 10
}
type Obj = typeof obj // 获取并定义 obj 的类型
logger2<Obj>(obj)

// ________________________________________________________________
// 类型兼容(判断兼不兼容跟 extends 继承没有关系，只看形状【有没有对应的属性】)
// class GrandFather { }
// class Father extends GrandFather { }
// class Child extends Father {}
// function get<T extends Father>() {}
// get<Child>()
// get<Father>()
// get<GrandFather>()
class GrandFather { grandFather: string }
class Father extends GrandFather { father: string }
class Child extends Father { child: string }
// function get<T extends Father>() { }
// get<Child>()
// get<Father>()
// get<GrandFather>() // 不满足约束 Father

// NOTE: extends 跟继承没有关系，是一种类型约束，只看形状（有没有对相应的属性）
// 只能适用于接口或对象属性上来说才是只多不少
// 严格来说就是子类型
function get<T extends Father>() { } // T 是 Father 的子类型，或者说 T 能赋值给 Father
let father = new Father()
const child = new Child()
father = child // child 可以赋值给 father
// child = father // father 不能赋值给 child，因为 child 不存在 father 上的类型

// ________________________________________________________________
namespace a {
	interface Calculate {
		<T extends (string | number)>(a: T, b: T): void
	}
	const sum: Calculate = function <T extends (string | number)>(a: T, b: T): void { }
	// string 是 (string | number) 的子类型
	// 包含关系
	sum<string>('1', '2')
	// sum<string | number>(1, 2)

	// (string|number) 是 (string|number|boolean) 的子类型
	// sum<string | number | boolean>(1, 2) // string|number 中没有包含 boolean 所以不行
}