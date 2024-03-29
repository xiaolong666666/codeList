
// 原型链继承
// 通过原型链，子类可以共享父类的属性和方法
// 缺点：1.子类可以重写父类的方法（这样导致父类其他实例都受影响）(父类的属性和方法被子类所共享)
//      2.在创建子类的实例时，不能向父类的构造函数传递参数

// 父类
function Father(name, work) {
    //属性 
    this.name = name;
    this.work = work;
    this.eat = function () {
        console.log("父类的eat方法");
    }
}

// 父类原型方法
Father.prototype.getName = function () {
    console.log("父类原型的方法getName：" + this.name);
}

// 子类
function Son(sno, sex) {
    this.sno = sno;
    this.sex = sex;
    this.sleep = function () {
        console.log("子类的sleep方法")
    }
}

// 子类原型方法
Son.prototype.hello = function () {
    console.log("子类原型上的方法hello")
}

// 原型链继承，核心是将父类的实例作为子类的原型
Son.prototype = new Father("tom", "web");   // 让子类的原型指向父类的实例，子类就继承了父类的属性和方法

Son.prototype.constructor = Son;    // 保证原型链重定向后的完整性,原型链完整就是 protoype 上有 constructor


var s1 = new Son("10001", "男");    // 实例化对象
console.log("s1", s1);
// 实例可以用类赋予他的私有的属性和方法，也可以用类原型上公有的属性和方法
// 通过原型链来查找，先找私有的，再找公有的
console.log("子类学号: " + s1.sno, "子类性别: " + s1.sex);
s1.sleep();

// 继承过来的父类的属性和方法
console.log("继承过来的父类的name: " + s1.name, "继承过来的父类的work: " + s1.work);
s1.eat();
s1.getName();   // 父类原型上的方法
s1.hello(); // 缺点：不能保留子类原型上的方法

