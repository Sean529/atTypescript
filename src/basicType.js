var married = true;
var age = 18;
var first_name = 'at';
var arr1 = [1, 2, 3, 4];
var arr2 = [5, 6, 7];
// 元祖类型 tuple 数量和类型已知的数组
var at = ['at', 18];
// ________________________________________________________________
// 普通枚举
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
console.log(Gender['GIRL'], Gender[0]);
console.log(Gender['BOY'], Gender[1]);
var myColor = [0 /* RED */, 1 /* YELLOW */, 2 /* BLUE */]; // 0,1,2 / 编译后 Colors 中的变量就被省去了
// ________________________________________________________________
// 任意类型
// any
// 如果变量定义为 any 类型，就跟 js 差不多，不进行类型检查
// const root: any = document.getElementById('root')
// root.style.color = 'red'
// const element: HTMLElement | null = document.getElementById('root')
// element && (element.style.color = 'green')
// 非空断言（表示告诉ts这个变量一定会有值）
// element!.style.color = 'green'
// null undefined 是其他类型的子类型
// 如果 tsconfig.json 中配置 strictNullChecks 的值为 true，则不能把 null undefined 赋值给 x
var x;
x = 1;
// strictNullChecks 设置为true时，undefined 和 null 不是其他类型的子类型
// x = undefined
// x = null
var z = undefined;
var z2 = undefined;
var z3 = null;
var y;
y = 1;
y = null;
y = undefined;
// ________________________________________________________________
// never 代表不会出现的值 永远不
// 1. 作为不会返回的函数的返回值
function error(message) {
    throw new Error('报错');
}
function loop() {
    while (true) {
    }
}
function fn(x) {
    if (typeof x === 'number') {
        console.log(x);
    }
    else if (typeof x === 'string') {
        console.log(x);
    }
    else {
        console.log(x); // never 不可能走到这里
    }
}
// ________________________________________________________________
// void 代表没有任何类型
// 函数没有返回值，那么就是 void 类型
function greeting() {
    return undefined;
    // return null // strictNullChecks 如果是 false 可以返回 null，否则会报错
}
// void 和 never 区别
// 1. void 可以被赋值为 null undefined
// 2. never 不能包含任何类型
// 3. 如果函数的返回类型是 void 可以正常执行，但是返回 never 的函数无法正常执行（error/while/始终走不到的case）
// ________________________________________________________________
// Symbol
var s1 = Symbol('key');
var s2 = Symbol('key');
// console.log(s1 === s2) // 始终不同 且会报错
// ________________________________________________________________
// BigInt
var max = Number.MAX_SAFE_INTEGER; // 2^53-1 js 是双精度类型
console.log(max + 1 === max + 2); // true
var bigIntMax = BigInt(Number.MAX_SAFE_INTEGER);
console.log(bigIntMax + BigInt(1) === bigIntMax + BigInt(2)); // false
// n 代表大整型的意思，数字后面加n表示bigint 类型
console.log(bigIntMax + 1n == bigIntMax + 2n); // false
// ________________________________________________________________
// bigint 和 number 互不兼容
var foo;
var bar;
// foo = bar
// bar = foo
// Number BigInt 是 JS 中的类型
// number 和 bigint 是 TS 中的类型
