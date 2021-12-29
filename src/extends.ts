export { }
class Person {
	name: string
	age: number
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
	getName(): string { return this.name }
	setName(name: string): void { this.name = name }
}
class Student extends Person {
	stuNo: string
	constructor(name: string, age: number, stuNo: string) {
		super(name, age)
		this.stuNo = stuNo
	}
	getStuNo(): string { return this.stuNo }
}