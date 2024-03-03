const div = document.querySelector('div')
const a = document.querySelector('a')
const button = document.querySelector('button')

const divClick = (event) => {
  console.log('div click')
  event.preventDefault()  // 阻止默认事件
}

const aClick = () => {
  console.log('a click')
}

const click1 = (event) => {
  console.log('button click1')
  event.stopPropagation() // 阻止冒泡
  event.stopImmediatePropagation()  // 阻止同类事件的其他监听器的执行
}

const click2 = () => {
  console.log('button click2')
}

div.addEventListener('click', divClick, false)
a.addEventListener('click', aClick, false)
button.addEventListener('click', click1, false)
button.addEventListener('click', click2, false)

// 冒泡 ==> 事件委托
const ul = document.querySelector('#ul')
console.dir(ul)
ul.addEventListener('click', (event) => {
  const target = event.target
  if (target.tagName.toLowerCase() === 'li') {
    const liList = ul.querySelectorAll('li')
    const idx = Array.prototype.indexOf.call(liList, target)
    console.log(`索引：${idx} 内容：${liList[idx].innerHTML || target.textContent}`)
  }
}, false)