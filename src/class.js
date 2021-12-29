"use strict";
exports.__esModule = true;
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.getName = function () {
        console.log(this.name);
    };
    return Person;
}());
var p1 = new Person();
p1.name = 'at';
p1.getName();
// 定义存取器 ts 通过存取器来改变类中属性的读取和赋值操作
var User = /** @class */ (function () {
    function User(myName, myAge) {
        this.myName = myName;
        this.myAge = myAge;
    }
    Object.defineProperty(User.prototype, "age", {
        get: function () {
            return this.myAge;
        },
        set: function (value) {
            this.myAge = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this.myName;
        },
        set: function (value) {
            this.myName = value;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
var user = new User('at', 18);
user.name = 'AT';
console.log(user.name);
console.log(user.age);
