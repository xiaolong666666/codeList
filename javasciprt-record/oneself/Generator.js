// Generator 生成器
// iterator 迭代器
// Symbol.iterator 迭代

function* generator() {
  const users = yield axios.get('https://jsonplaceholder.typicode.com/users')
  console.log(users?.data)
  const posts = yield axios.get('https://jsonplaceholder.typicode.com/posts')
  console.log(posts?.data)
  const todos = yield axios.get('https://jsonplaceholder.typicode.com/todos')
  console.log(todos?.data)
  return {
    users: users?.data,
    posts: posts?.data,
    todos: todos?.data
  }
}

// 自动执行的 Generator 函数
const run = (generator) => {
  const iterator = generator()

  const handle = (yielded) => {
    if (!yielded.done) {
      yielded.value.then(res => {
        return handle(iterator.next(res))
      })
    }
  }

  return handle(iterator.next())
}

// run(generator)

// async-await  Generator 语法糖
async function gen() {
  const users = await axios.get('https://jsonplaceholder.typicode.com/users')
  console.log(users?.data)
  const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
  console.log(posts?.data)
  const todos = await axios.get('https://jsonplaceholder.typicode.com/todos')
  console.log(todos?.data)
  return {
    users: users?.data,
    posts: posts?.data,
    todos: todos?.data
  }
}

// const g = gen()
// g.then(console.log)

// Generator 其他用法
// 斐波那契数列
function getFibonacciSequence(n) {
  function* generator() {
    let i = 0;
    let j = 1;
    while (true) {
      yield i
      let temp = j
      j += i
      i = temp
    }
  }

  let count = 0
  const result = []
  for (let v of generator()) {  // iterator
    result.push(v)
    count++
    if (count === n) break;
  }

  return result
}

console.log(getFibonacciSequence(10))




