export { }
// ________________________________________________________________
// 抽象类 抽象描述一种抽象的概念，无法被实例化，只能被继承
// 无法创建抽象类的实例
// 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
// 动物很抽象
abstract class Animal {
	name: string
	abstract speak(): void
}

class Cat extends Animal {
	// 子类重写继承自父类的方法 [重写 override]
	speak(): void {
		console.log('喵喵喵');
	}
}

class Dog extends Animal {
	// 子类重写继承自父类的方法 [重写 override]
	speak(): void {
		console.log('汪汪汪');
	}
}

// ________________________________________________________________
// 重写 override 子类重写继承自父类的方法
// 重载 overload 函数的重载 一个函数有多个定义
function double(val:string)
function double(val:number)
function double(val: any) {
	if (typeof val === 'string') {
		return val + val
	}else if (typeof val === 'number') {
		return val * 2
	}
}

double(1)
double('2')
// double(true)

// ________________________________________________________________
// 继承和多态
// 继承 子类继承父类
// 多态 同一个方法，不同子类有不同实现
