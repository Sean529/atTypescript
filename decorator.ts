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

	console.log(p);
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

	console.log(p.name);
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
	console.log(p.name);
}