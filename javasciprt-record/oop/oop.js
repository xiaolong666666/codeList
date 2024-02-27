
// 如果构造函数不初始化，可以使用吗？
//    无法(正常)使用
// 如果项目中需要使用，通常（不被外界感知）如何解决？
//    启发：写底层代码时，不需要让外界熟悉感知内部代码思想
//    延伸：通过改进 => 不多次实例化，同一个实例 => 单例模式

let staticProps
function Course(teacher) {
  const _isClass = this instanceof Course
  if (!_isClass) {
    staticProps = new Course(teacher)
    return staticProps
  } else {
    this.teacher = teacher
    this.course = 'oop'
    this.startCourse = function() {
      
    }
    return staticProps
  }
}

let course = Course('xl')