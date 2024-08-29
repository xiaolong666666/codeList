Promise.resolve().then(() => {
  console.log(0);
  // case 1
  // return Promise.resolve(4);
  // case 2
  // return new Promise((resolve) => resolve(4));
  // case 3
  new Promise((resolve) => resolve(4))
    .then((res) => res)
    .then((res) => res)
    .then((res) => console.log(res));
});
// .then((res) => {
//   console.log(res);
// });  // case 3

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  });
