export { }
// 装饰器
// 1. 装饰器是一种特殊的声明，可以附加到类声明、方法、属性和参数上
// 2. 它可以修改类的行为
// 3. 类装饰器，方法装饰器、属性装饰器、参数装饰器。
// ________________________________________________________________
// 类装饰器
namespace a1 {
	function addNameEat(constructor: Function) {
		constructor.prototype.name = 'at'
		constructor.prototype.eat = function () { }
	}

	@addNameEat
	class Person {
		name: string
		eat: Function
		constructor() { }
	}

	const p: Person = new Person()

	// console.log(p.name);
	// p.eat()
}

// ________________________________________________________________
// 装饰器工厂
namespace a {
	function addNameEatFactory(name: string) {
		return function AddNameEat(constructor: Function) {
			constructor.prototype.name = name
			constructor.prototype.eat = function () { }
		}
	}
	@addNameEatFactory('at')
	class Person {
		name: string
		eat: Function
		constructor() { }
	}
	const p: Person = new Person()

	// console.log(p.name);
}

// ________________________________________________________________
// 类装饰器，装饰类
// 参数可以多，但不能少
// TS 的精髓 - 类型安全
namespace c {
	function replacePerson(constructor: Function) {
		return class {
			name: string
			eat: Function
			age: number
		}
	}
	@replacePerson
	class Person {
		name: string
		eat: Function
		constructor() { }
	}
	const p: Person = new Person()
	// console.log(p.name);
}

// ________________________________________________________________
// 函数装饰器和(静态)参数装饰器
namespace d {
	// 如果装饰的是实例属性，target 是构造函数的原型
	function upperCase(target: any, propertyKey: string) {
		let value = target[propertyKey]
		// console.log('%c AT-[ value ]-77', 'font-size:13px; background:#de4307; color:#f6d04d;', value)
		const getter = () => value
		const setter = (newValue: string) => value = newValue.toUpperCase()
		if (delete target[propertyKey]) {
			Object.defineProperty(target, propertyKey, {
				get: getter,
				set: setter,
				enumerable: true,
				configurable: true
			})
		}
	}

	// 如果装饰的是静态属性，target 是构造函数本身
	function staticPropertyDecorator(target: any, propertyKey: string) {
		target[propertyKey] = 11
	}

	// 枚举
	function noEnumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		descriptor.enumerable = false
	}

	function toNumber(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const oldMethod = descriptor.value
		descriptor.value = function (...args: any[]) {
			args = args.map(item => parseFloat(item))
			return oldMethod.apply(this, args)
		}
	}

	class Person {
		@upperCase
		name: string = 'at' // 实例属性
		@staticPropertyDecorator
		static age: number = 10 // 静态属性
		@noEnumerable
		getName() { // 实例方法
			console.log(this.name);
		}
		@toNumber
		sum(...args: any[]) { // 实例方法
			return args.reduce((accu: number, item: number) => accu + item, 0)
		}
	}
	const p = new Person();
	const amount = p.sum('1', '2', '3')
	// console.log('%c AT-[ amount ]-117', 'font-size:13px; background:#de4307; color:#f6d04d;', amount)
}

// ________________________________________________________________
// 参数装饰器

namespace e {
	// 在 IOC容器大方异彩，Nest.js 大量的用到了参数装饰器
	/**
	 * @param target 静态成员就是构造函数，非静态成员就是构造函数的原型 {}
	 * @param methodName 方法的名称 login
	 * @param paramIndex // 参数的下标 1
	 */
	function addAge(target: any, methodName: string, paramIndex: number) {
		target.age = 10
		console.log(target, methodName, paramIndex);
	}
	class Person {
		age: number
		login(username: string, @addAge password: string) {
			console.log(this.age, username, password);
		}
	}
	const p = new Person()
	p.login('at', '123')
}

// ________________________________________________________________
// 装饰器的执行顺序 类、函数、参数

// 1.与 React 父子组件生命周期执行顺序类似，由内向外，由上到下执行
// 2.属性装饰器先遇到先执行
// 3.方法和属性都有装饰器的情况，先执行属性装饰器
namespace f {
	function ClassDecorator1() {
		return function (target) {
			console.log('%c AT-[ target ]-154', 'font-size:13px; background:#de4307; color:#f6d04d;', target)
		}
	}
	function ClassDecorator2() {
		return function (target) {
			console.log('%c AT-[ target ]-159', 'font-size:13px; background:#de4307; color:#f6d04d;', target)
		}
	}
	function PropertyDecorator(name: string) {
		return function (target, propertyKey) {
			console.log('%c AT-[ target ]-164', 'font-size:13px; background:#de4307; color:#f6d04d;', target)
			console.log('%c AT-[ propertyKey ]-164', 'font-size:13px; background:#de4307; color:#f6d04d;', propertyKey)
		}
	}
	function MethodDecorator() {
		return function (target, propertyKey) {
			console.log('%c AT-[ target ]-170', 'font-size:13px; background:#de4307; color:#f6d04d;', target)
			console.log('%c AT-[ propertyKey ]-170', 'font-size:13px; background:#de4307; color:#f6d04d;', propertyKey)
		}
	}

	function ParameterDecorator() {
		return function (target, propertyKey, propertyIndex) {
			console.log('%c AT-[ target ]-177', 'font-size:13px; background:#de4307; color:#f6d04d;', target)
			console.log('%c AT-[ propertyKey ]-177', 'font-size:13px; background:#de4307; color:#f6d04d;', propertyKey)
			console.log('%c AT-[ propertyIndex ]-177', 'font-size:13px; background:#de4307; color:#f6d04d;', propertyIndex)
		}
	}

	@ClassDecorator1()
	@ClassDecorator2()
	class Person {
		@PropertyDecorator('name')
		name: string = ''
		@PropertyDecorator('age')
		age: number = 18
		@MethodDecorator()
		hello(@ParameterDecorator() p1: string, @ParameterDecorator() p2: string) { }
	}
	const p = new Person()
}