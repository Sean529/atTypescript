export { }
// ________________________________________________________________

// 通过关键字 typeof instanceof for in 来缩小范围
function double(input: number | string) {
	if (typeof input === 'string') {
		console.log(input);
	} else if (typeof input === 'number') {
		console.log(input);
	}
}

class Animal {

}

class Bird extends Animal {

}

class Dog extends Animal {

}

function getName(animal: Animal) {
	if (animal instanceof Bird) {
		console.log(animal);
	} else if (animal instanceof Dog) {
		console.log(animal);
	}
}

// ________________________________________________________________
// null 保护
function getFirstLetter(s: string | null) {
	// 方法1
	// if (s === null) {
	// 	return ''
	// }

	// 方法2
	// s = s || ''

	// 该方法不行
	// function log() {
	// 	s = s || ''
	// }
	// log()

	// ! 的情况如果是 null 会报错
	return s!.charAt(0)
}

// ________________________________________________________________
// 链判断运算符
const a = { b: 2 }
const result = a?.b

const x = 'c'
a?.[x]
// a?.[x]() // 报错

// ________________________________________________________________
// 可辨识的联合类型
interface WarningButton {
	class: 'waring',
	text: '修改'
}

interface DangerButton {
	class: 'danger',
	text: '删除'
}

function getButton(button: WarningButton | DangerButton): void {
	if (button.class === 'waring') {
		console.log(button);
	} else if (button.class === 'danger') {
		console.log(button);
	}
}

interface User {
	username: string
}

type Action = {
	type: 'add',
	payload: User
} | { type: 'delete', payload: number }

const reduce = (action: Action) => { 
	switch(action.type) {
		case 'add':
			action.payload.username
			break
		case 'delete':
			const id:number = action.payload
			break
	}
}

interface Bird {
	swing: number
}
interface Dog {
	leg: number
}

function getNumber(x: Bird | Dog) {
	if ('swing' in x) {
		console.log(x);
	} else {
		console.log(x);
	}
}

// ________________________________________________________________
// 自定义类型保护（有难度！！）
// 1. 是一个表达式
// 在运行时进行类型检查
// 保证在某个作用域内是符合预期的 

