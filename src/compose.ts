// ________________________________________________________________
// 0个参数
// R 就是把 'at' 返回
console.log(compose()('at'));

// 1个参数 / 把函数返回
const add1 = function (str: string): string { return str + '1' }
console.log(compose(add1)('at'));

// 2个参数
const add2 = function (str: string): string { return str + '2' }
console.log(compose<string, any[], string>(add1, add2)('at'))
 
// ________________________________________________________________
type Func<T extends any[], R> = (...a: T) => R
// zero functions
export default function compose(): <R>(a: R) => R
// one functions
export default function compose<F extends Function>(f: F): F
// two functions
// A f2 返回值
// T 是 f2 的参数 any[]
// R 是 f1 的返回值

// 最终返回一个函数，接收一个T参数，返回一个R结果
// 返回的函数的Func T('at') 给了 f2 作为参数，又返回 A 作为 f1 的参数
export default function compose<A, T extends any[], R>(
	f1: (a: A) => R, // A 是参数 ’at2' / R 是返回值 at21
	f2: Func<T, A> // T 是参数 'at' / A 是返回值 at2 / 
): Func<T, R> // T 是参数 'at' R 是返回值 at21
// three functions
export default function compose<A, B, T extends any[], R>(
	f1: (b: B) => R,
	f2: (a: A) => B,
	f3: Func<T, A>
): Func<T, R>
// four functions // 为什么写到4个不写了，因为中间件一般最多4、5个。 promise thank logger 基本够用
export default function compose<A, B, C, T extends any[], R>(
	f1: (c: C) => R,
	f2: (b: B) => C,
	f3: (a: A) => B,
	f4: Func<T, A>
): Func<T, R>

// rest
export default function compose<R>(
	f1: (a: any) => R,
	...funcs: Function[]
): (...args: any[]) => R // 参数任意，返回 R

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R

// NOTE: redux 里的 compose
export default function compose(...funcs: Function[]) {
	if (funcs.length === 0) {
		return <T>(arg: T): T => arg
	}
	if (funcs.length === 1) {
		return funcs[0]
	}
	return funcs.reduce((a, b) => (...arg) => a(b(...arg)))
}
