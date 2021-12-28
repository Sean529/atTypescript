export = {}
// public protected private
class Father {
	public name: string // public 自己、自己的子类和其他类都能访问
	protected age: number // protected 自己和自己的子类能访问，其他类不能访问
	private money: number // private 自己能访问，子类和其他类不能访问
	constructor(name: string, age: number, money: number) { }
	private getName(): string { return this.name }
}

class Child extends Father {
	constructor(name: string, age: number, money: number) {
		super(name, age, money)
	}
	desc() {
		console.log(this.name, this.age);
	}
}

const child = new Child('AT', 18, 100)
// child.age // 受保护的 age 只有 Father 和 Child 可以访问