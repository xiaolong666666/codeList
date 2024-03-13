// 实现一个红绿灯，红灯3s，绿灯2s，黄灯1s，交替进行

let arr = ['红', '绿', '黄']
let times = [1000, 3000, 2000]

var light = '红'
var i = 0

const fun = () => new Promise(resolve => {
  console.log(light)
  setTimeout(() => {
    i++
    if (i === 3) {
      i = 0
    }
    light = arr[i]
    resolve()
  }, 1000 * (3 - i))
}).then(fun)

const running = (t, l) => new Promise(resolve => setTimeout(resolve, t, l))

// const fun = async () => {
//     while (i < 3) {
//         const current = await running(times[i], arr[i])
//         i++
//         console.log(current)
//     }
//     i = 0
//     fun()
// }

fun()
// fun()
