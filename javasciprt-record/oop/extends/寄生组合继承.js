// 寄生组合继承
/*
*寄生组合继承：call继承 + 类似于原型继承
*特点：父类私有和公有的分别是子类实例的私有和公有属性方法
*/

//使用构造函数定义父类的属性
function Father(name) {
    this.name = name;
    this.eat = function () {
        console.log("父类的eat方法");
    }
}

//使用原型对象定义父类的方法
Father.prototype.getName = function () {
    console.log("父类方法原型getName:" + this.name);
}

//使用构造函数定义子类的属性
function Son(age, name) {
    //=>this:Son的实例s1
    Father.call(this, name);//=>s1.name="tom";
    this.age = age;
    this.sleep = function () {
        console.log("子类的sleep方法")
    }
}
// => Object.create(obj): 创建一个对象，让对象__proto__指向obj
Son.prototype = Object.create(Father.prototype); // 原型链继承是 new 一个父类的实例，父类的实例一定会有他的私有属性也有他的公有方法，而 Object.create(Father.prototype) 只会创建出一个空对象指向父类的原型，相当于创建了一个父类的实例，但是这个实例没有私有属性和方法
// !!! 如果按着原型链继承将（new）实例化对象指向 Son.prototype , 子类构造器函数和继承原型两处都会调用父类的构造器函数，如果父类构造器函数中有算术运算会出现错误，造成bug

// 让父类公有变成子类公有
Son.prototype.constructor = Son;    // 弥补因替换原型而失去的默认的constructor属性
Son.prototype.getAge = function () {
    console.log("子类原型age:" + this.age);
}

// 实例化一个子类对象
var s1 = new Son(18, 'tom');
console.log(s1);
console.log("子类age：" + s1.age, "父类的name:" + s1.name);
s1.sleep(); // 子类私有方法
s1.getAge();    // 子类原型上的方法

// 继承父类方法
s1.eat();   // 父类私有方法
s1.getName();   // 父类原型上的方法
