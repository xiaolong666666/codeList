function* generator() {
  const users = yield axios.get("https://jsonplaceholder.typicode.com/users")
  console.log("users", users)
  const posts = yield axios.get("https://jsonplaceholder.typicode.com/posts")
  console.log("posts", posts)
}

const run = generator => {
  const g = generator()
  const handdle = (yielded) => {
    if (!yielded.done) {
      yielded.value.then((data) =>
        handdle(g.next(data))
      )
    }
  }
  handdle(g.next())
}

run(generator)