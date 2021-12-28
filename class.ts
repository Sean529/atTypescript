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

