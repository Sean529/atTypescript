// 默认文件是在全局的作用域
export { } // 如果页面中出现了 export/import 则 ts 认为一个模块，里面的变量是私有的

class Person {
	name: string
	getName(): void {
		console.log(this.name);
	}
}

const p1 = new Person();
p1.name = 'at'
p1.getName()

// ________________________________________________________________
// 定义存取器 ts 通过存取器来改变类中属性的读取和赋值操作
class User {
	myName: string
	myAge: number
	constructor(myName: string, myAge: number) {
		this.myName = myName
		this.myAge = myAge
	}

	get age() {
		return this.myAge
	}

	set age(value: number) {
		this.myAge = value
	}

	get name() {
		return this.myName
	}
	set name(value: string) {
		this.myName = value
	}
}

const user = new User('at', 18)
user.name = 'AT'
console.log(user.name);
console.log(user.age);


// ________________________________________________________________
// 参数属性
// public
class User2 {
	// 公开参数
	// myName: string
	constructor(public myName: string) {
		// this.myName = myName
	}

	get name() {
		return this.myName
	}
	set name(value: string) {
		this.myName = value
	}
}

const user2 = new User('at', 18)
user2.name = 'AT'
console.log(user2.name);
console.log(user2.age);

// readonly
class Animal {
	public readonly name:string
	constructor(name: string) {
		this.name = name
	}

	changeName(name: string) {
		// this.name = name // 只读属性不可更改
	}
}