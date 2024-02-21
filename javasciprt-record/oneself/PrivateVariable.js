function createStack() {
  const items = []
  return {
    get: function () {
      return structuredClone(items) // 深拷贝items，防止外部修改items影响私有变量
    },

    push: function (item) {
      items.push(item)
    }
  }
}