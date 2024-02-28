const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const onExecutorWithTryCatch = (onExecutor, params, resolve, reject) => {
  try {
    const result = onExecutor(params)
    resolve(result)
  } catch (error) {
    reject(error)
  }
}

class MyPromise {
  state = PENDING
  value
  reason
  fulfilledCallbacks = []
  rejectedCallbacks = []

  constructor(executor) {
    
    const resolve = value => {
      if (this.state === PENDING) {
        queueMicrotask(() => {  // queueMicrotask: 将微任务加入队列以在控制返回浏览器的事件循环之前的安全时间执行callback (类似创建一个微任务)
          if (this.state !== PENDING) return
          this.state = FULFILLED
          this.value = value
          this.fulfilledCallbacks.forEach(callback => {
            callback(this.value)
          })
        })
      }
    }

    const reject = reason => {
      if (this.state === PENDING) {
        queueMicrotask(() => {
          if (this.state !== PENDING) return
          this.state = REJECTED
          this.reason = reason
          this.rejectedCallbacks.forEach(callback => {
            callback(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(resolveEvent, rejectEvent) {
    resolveEvent = resolveEvent || (value => value)
    rejectEvent = rejectEvent || (error => { throw error })
    return new MyPromise((resolve, reject) => {
      if (this.state === PENDING) {
        // this.fulfilledCallbacks.push(resolveEvent)
        // this.rejectedCallbacks.push(rejectEvent)
        // 上面写法如果 then 方法不传第二个参数 错误不会被 catch 捕获
        this.fulfilledCallbacks.push(() => {
          onExecutorWithTryCatch(resolveEvent, this.value, resolve, reject)
        })
        this.rejectedCallbacks.push(() => {
          onExecutorWithTryCatch(rejectEvent, this.reason, resolve, reject)
        })
      }
      if (this.state === FULFILLED) {
        onExecutorWithTryCatch(resolveEvent, this.value, resolve, reject)
      }
      if (this.state === REJECTED) {
        onExecutorWithTryCatch(rejectEvent, this.reason, resolve, reject)
      }
    })
  }

  catch(rejectEvent) {
    return this.then(null, rejectEvent)
  }

  finally(callback) {
    return this.then(callback, callback)
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value))
  }

  static reject(error) {
    return new MyPromise((_, reject) => reject(error))
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([])
      } else {
        const result = []
        const length = promises.length
        let count = 0
        for(let i = 0; i < length; i++) {
          promises[i].then(
            value => {
              result[i] = value
              count++
              if (count === length) resolve(result)
            },
            error => reject(error)
          )
        }
      }
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([])
      } else {
        const length = promises.length
        for (let i = 0; i < length; i++) {
          promises[i].then(
            value => resolve(value),
            error => reject(error)
          )
        }
      }
    })
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([])
      } else {
        const result = []
        const length = promises.length
        let count = 0
        for (let i = 0; i < length; i++) {
          promises[i].then(
            value => resolve(value),
            error => {
              result[i] = error
              count++
              if (count === length) reject(result)
            })
        }
      }
    })
  }

  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([])
      } else {
        const result = []
        const length = promises.length
        let count = 0
        for (let i = 0; i < length; i++) {
          promises[i].then(
            value => {
              count++
              result[i] = { status: 'fulfilled', value }
            },
            error => {
              count++
              result[i] = { status: 'rejected', reason: error }
            }
          )
            .finally(() => {
            if (count === length) resolve(result)
          })
        }
      }
    })
  }
}

// const myPromise = new MyPromise((resolve, reject) => {
//   const random = Math.random()
//   random > 0.2 ? resolve(random) : reject(random)
// })
//   .then(res => console.log(res), e => console.error(e))

// const p0 = new MyPromise((resolve, reject) => setTimeout(() => {
//   const random = Math.random()
//   random > 0.6 ? resolve(random) : reject(random)
// }, 600))

// const p1 = MyPromise.resolve(1)
const p1 = new MyPromise(resolve => setTimeout(resolve, 400, 1))
// const p2 = MyPromise.reject(2)
const p2 = new MyPromise((_, reject) => setTimeout(reject, 200, 2))
const p3 = new MyPromise(resolve => setTimeout(resolve, 600, 3))
const p4 = MyPromise.all([p1, p2, p3])
const p5 = MyPromise.race([p2, p1, p3])
const p6 = MyPromise.any([p2, p1, p3])
const p7 = MyPromise.allSettled([p2, p1, p3])
// new MyPromise((resolve, reject) => reject(123)).then(alert).catch(alert)
// p0.then(console.log, console.error)
// p1.then(console.log)
// p2.catch(console.error)
// p4.then(console.log, console.error).catch(alert)
// console.log('p4', p4.then(console.log).catch(alert))
// console.log('p5', p5.then(console.log).catch(alert))
// console.log('p6', p6.then(console.log).catch(alert))
// console.log('p7', p7.then(console.log).catch(alert))

