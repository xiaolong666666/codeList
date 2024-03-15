const promisify = (fn) =>
  (...args) =>
    new Promise((resolve, reject) => {
      const [callback, ...rest] = args
      fn(() => {
        callback()
        resolve()
      }, ...rest)
    })

// callback 适配器
// const promisify = (f) =>
//   (...args) =>  // return a wrapper-function (*)
//      new Promise((resolve, reject) => {
//       f(...args, (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       })
//     });

const fn = promisify(setTimeout)
let x = async () => {
  await fn(() => console.log(1), 2000)
  console.log(2)
}
x()