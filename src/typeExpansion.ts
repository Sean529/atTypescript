export { }
// 类型扩展
// ________________________________________________________________
// 扩展局部变量的类型
declare var String: StringConstructor
interface StringConstructor {
	new(value?: any): String
	(value?: any): string
	readonly prototype: String
}
interface String {
	toString(): string
}
String.prototype.double = function (): string {
	return this + this
}

const result = new String("hello").double() // hellohello

console.log('%c AT-[ result ]-19', 'font-size:13px; background:#de4307; color:#f6d04d;', result)
interface String {
	double(): string
}

// ________________________________________________________________
// 在局部模块中扩展全局变量使用 declare global
declare global {
	interface Window {
		myName: string
	}
}
console.log(window.myName);

// ________________________________________________________________
// 给 events 库添加类型声明
import { EventEmitter } from 'events'
const e = new EventEmitter()
e.on('message', (text: string): void => {
	console.log(text);
})
e.emit('message', 'hello')

// ________________________________________________________________
// 给 store 扩展 age 属性

import { createStore, Store } from 'redux'
const reducer = (state: any) => state
type ExtStore = Store & { age: number }
const store: ExtStore = createStore(reducer)
store.age