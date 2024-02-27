// call继承
/*
*只能继承父类私有的属性和方法(因为不是在原型上的属性和方法)
*实现父类私有变成子类私有
*/
// 父类
function Father(info) {
    this.name = info.name;
    this.work = info.work;
    this.eat = function () {
        console.log("父类的eat方法");
    };
};

// 父类原型方法 
Father.prototype.getName = function () {
    console.log("父类原型的方法getName：:" + this.name);
};

// 子类
function Son(info) {
    // => this:Son的实例s1的私有属性;
    Father.call(this, info);    // => s1.name = tom;    // 弥补了原型链继承不能向父类传参的缺点
    this.sex = info.sex;
    this.age = info.age;
    this.sleep = function () {
        console.log("子类的sleep方法");
    }
};

// 子类原型方法
Son.prototype.getAge = function () {
    console.log("子类原型方法getAge:" + this.age);
};

var s1 = new Son({ sex: "男", age: 18, name: "jarry", work: "web" });   // 实例化
console.log("子类sex:" + s1.sex, "子类的age:" + s1.age);
s1.sleep(); // 子类私有方法
s1.getAge();    // 子类原型上的方法

// 父类的属性和方法
console.log("父类name:" + s1.name);
console.log("继承过来的父类的私有方法:", s1.eat());
s1.getName(); // 继承不了父类原型上的方法

// 但是父类原型上的方法还是不能继承，我们只是让父类私有变成了子类私有，如何让父类公有变成子类公有呢？