function hello(name: string): void {
	console.log('hello', name);
}

hello('at')

type GetName = (firstName: string, lastName: string) => string
let getName: GetName = function (firstName: string, lastName: string): string {
	return firstName + lastName
}

getName('A', 'T')

// ________________________________________________________________
// 可选参数
function print(name: string, age?: number): void {

}
print('at')

// ________________________________________________________________
// 可选参数 给默认值
function ajax(url: string, method: string = 'GET'): void {
	console.log(url, method);
}

ajax('/')

// ________________________________________________________________
// 剩余参数
function sum(...numbers: number[]) {
	return numbers.reduce((val, item) => val + item, 0)
}
const amount = sum(1, 2, 3)
console.log('%c AT-[ amount ]-35', 'font-size:13px; background:#de4307; color:#f6d04d;', amount)

// ________________________________________________________________
// 函数重载
// 同样的函数有很多种传参方式
// 两个或两个以上重名函数，给同一函数提供多次函数定义
// 函数声明和函数实现要贴在一起不能分开
const obj: any = {}
function attr(val: string): void
function attr(val: number): void
function attr(val: any): void {
	if (typeof val === 'string') {
		obj.name = val
	} else if (typeof val === 'number') {
		obj.age = val
	}
}
// ________________________________________________________________
// 使用场景
function add(a: string, b: string): void
function add(a: number, b: number): void
function add(a: string | number, b: string | number): void {

}
add('a', 'b')
add(1, 2)
// add(1, 'a')

// 非常有名的案例

// ________________________________________________________________
// compose
// 7 个声明一个实现