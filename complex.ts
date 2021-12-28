// 类型推导

// let num = '23'
// num = 123 // 推导成字符串，所以这里赋值number类型会报错

// ________________________________________________________________
// 包装对象 wrapper object
// 原始类型 对象类型

// 原始类型
const name2 = 'at'
// 调用基础数据类型上的方法时，内部会自动帮你包装成对象类型（包装对象），会在基本数据类型和对象类型上迅速进行一个强制切换
console.log(name2.toUpperCase());
console.log(new String(name2).toUpperCase());

const isOk1: boolean = true
const isOk2: boolean = Boolean(1)
// const isOk3: boolean = new Boolean(1) // 返回的是对象类型所以报错。不能讲对象类型赋值给 boolean 类型

// ________________________________________________________________
// 联合类型
let name3: string | number
name3 = '123'
console.log(name3.toString());
name3 = 3
console.log(name3.toFixed(2));
name3 = 'at'
console.log(name3.length);

// ________________________________________________________________
// 类型断言 将联合类型的变量指定为更为具体的类型
let name4: string | number
// console.log((name4! as number).toFixed(2)); // 将默认为 string 类型的变量，强行断言成 number 类型
// console.log((name4! as string).length);

// 双重断言
console.log(name4! as any as boolean);

// ________________________________________________________________
// 字面量类型
const up: 'Up' = 'Up';
const down: 'Down' = 'Down';
const right: 'Right' = 'Right';
const left: 'Left' = 'Left';
type Direction = 'Up' | 'Down' | 'Right' | 'Left'
// 可实现枚举效果
function move(direction: Direction) {

}
move('Down')

// ________________________________________________________________
// 类型字面量
type Person = {
	name: string
	age: number
}

const p1: Person = {
	name: 'at',
	age: 12
}

// ________________________________________________________________
// 字符串字面量
type T1 = '1' | '2' | '3' // 字符串字面量 / 限定该字面量使用的地方使用特定的值

// ________________________________________________________________
// 联合类型
type T2 = string | number | boolean // 联合类型对值没有限定
const t1: T1 = '3'
const t2: T2 = 3

// ________________________________________________________________