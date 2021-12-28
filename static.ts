export = {}
// public protected private
class Father {
	static fatherName: string = 'fatherName' // 静态属性
	public name: string // public 自己、自己的子类和其他类都能访问
	protected age: number // protected 自己和自己的子类能访问，其他类不能访问
	private money: number // private 自己能访问，子类和其他类不能访问
	constructor(name: string, age: number, money: number) { }
	toString() {
		console.log('father');
	}
	private getName(): string { return this.name }
}

class Child extends Father {
	static childName: string = 'childName'
	constructor(name: string, age: number, money: number) {
		super(name, age, money)
	}
	toString() {
		super.toString() // 【调用父类的方法】
		console.log('child');
	}
	desc() {
		console.log(this.name, this.age);
	}
}

const child = new Child('AT', 18, 100)
child.name // 【实例继承父类的 public 属性】
child.toString()

// child.age // 受保护的 age 只有 Father 和 Child 可以访问
Child.fatherName // 【子类可以继承父类的静态属性】
Child.childName


// ________________________________________________________________

const father = new Father('father', 38, 1000)
father.toString()