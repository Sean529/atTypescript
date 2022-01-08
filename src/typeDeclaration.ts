export { }
// declare 只在编译时检查，在编译后是看不到的
// ________________________________________________________________
// 普通的类型声明
declare let age: number
declare function getName(): string
declare class Animal { }
getName
age = 11

// ________________________________________________________________
// 外部枚举
// 用来描述已经存在的枚举的形状
declare enum Seasons {
	Spring,
	Summer,
	Autumn,
	Winter,
}
const seasons = [
	Seasons.Spring,
	Seasons.Summer,
	Seasons.Autumn,
	Seasons.Winter
]

// ________________________________________________________________
// 命名空间
// 一个全局变量有很多子属性，就可以用 namespace
// 声明文件里的 namespace 表示一个全局变量包含很多子属性
// 在命名空间内不需要再使用 declare 了
namespace a {
	declare namespace $ {
		function ajax(url: string, settings: any): void
		let name: string
		namespace fn {
			function extend(object: any): void
		}
	}
	$.ajax('/get', {})
	$.name
	$.fn.extend({})
}

// ________________________________________________________________
// 类型声明文件，.d.ts 结尾，通过观察类型声明文件来了解库怎么使用

// typings/jquery.ts
$('#button').click()
$('#button').width(100)

// ________________________________________________________________
// 第三方声明文件
// 可以安装使用第三方的声明文件
// @types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
// JavaScript中有很多内置的对象，它们可以在TypeScript中被当做声明好了的类型
// 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指ECMAScript和其他环境（比如DOM）的标准
// 这些内置对象的类型声明文件，就包含在Typescript核心库的类型声明文件中
import * as jQuery from 'jquery'
jQuery.ajax('get')

// import jQuery from 'jquery' // 为什么没有这样写
// 原因是在源码中是 export = jQuery，这是一种 TS 的语法，表示要导出 jQuery
// 有可能导出方式是 ESModule，也可能是 commonjs
// export jQuery
// export default jQuery
// 通过配置 tsconfig.ts ，esModuleInterop 设置为 true 即可，作用是将 commonjs模块转换为 es6 的模块导入方式

// ________________________________________________________________
// 查找声明文件
// 如果是手动写的声明文件，那么需要满足一下条件之一，才能被正确的识别
// 给package.json中的types或typings字段指定一个类型声明文件地址
// 在项目根目录下，边写一个index.d.ts文件
// 针对入口文件（package.json中的main字段指定的入口文件），编写一个同名不同后缀的.d.ts文件
// {
// 	"name":"myLib",
// 	"version": "1.0.0",
// 	"main": "lib/index.js",
// 	"types": "myLib.d.ts",
// }
// 1. 先找myLib.d.ts
// 2. 没有就再找index.d.ts
// 3. 还没有再找lib/index.d.ts
// 4. 还没有再找 @types/myLib/index.d.ts
// 4. 还找不到就认为没有类型声明了

// npm 声明文件可能的位置
// node_modules/jquery/package.json "types": "types/xxx.d.ts"
// node_modules/jquery/index.d.ts
// node_modules/@types/jquery/index.d.ts
// typings/jquery/index.d.ts

// ________________________________________________________________
// reference
// 引用其他模块