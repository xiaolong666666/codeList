// elem: 事件
// eventType: 事件类型
// func：触发的方法

function addEvent(param) {
  try {
    if (typeof param.elem == "object" && param.elem != null) {
      if (window.addEventListener) {
        param.elem.addEventListener(param.eventType, param.func);
      } else {
        param.elem.attachEvent("on" + param.eventType, param.func);
      }
    } else {
      throw new Error("不是对象或对象为空");
    }
  } catch (e) {
    alert(e.message);
  }
}
