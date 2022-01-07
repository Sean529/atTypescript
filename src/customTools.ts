export { }
// ________________________________________________________________
// 自定义工具类型
// github 自定义工具类型库 utility-types

// ________________________________________________________________
// proxy

type Proxy<T> = {
	get(): T
	set(value: T): void
}

type Proxify<T> = {
	[P in keyof T]: Proxy<T[P]>
}

// TODO: proxify<T> 泛型
function proxify<T>(obj: T): Proxify<T> {
	let result = <Proxify<T>>{}
	for (const key in obj) {
		Object.defineProperty(result, key, {
			get: () => obj[key],
			set: (value) => obj[key] = value
		})
	}
	return result
}
interface Props { name: string, age: number }
const props: Props = { name: 'at', age: 18 }
const proxyProps = proxify<Props>(props) // 调用 proxify 函数它的类型是 Props
const name = proxyProps.name
// proxyProps.name = 'AT'
console.log('%c AT-[ name ]-33', 'font-size:13px; background:#de4307; color:#f6d04d;', name)

// ________________________________________________________________
// unProxify
function unProxify<T>(t: Proxify<T>): T {
	let result: any = {} as T
	for (const key in t) {
		result[key] = t[key]
	}
	return result
}

const newObj = unProxify(proxyProps)
newObj.name = 'at'
console.log('%c AT-[ newObj.name ]-48', 'font-size:13px; background:#de4307; color:#f6d04d;', newObj.name)