const promisify = (fn) =>
  (...args) =>
    new Promise((resolve, reject) => {
      const [callback, ...rest] = args
      fn(() => {
        callback()
        resolve()
      }, ...rest)
    })  

const fn = promisify(setTimeout)
let x = async () => {
  await fn(() => console.log(1), 2000)
  console.log(2)
}
x()