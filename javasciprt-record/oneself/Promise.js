class MyPromise {
  state = 'pending'
  value = ''
  error = ''
  resolveCallbacks = []
  rejectCallbacks = []

  constructor(fn) {
    
    const resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.resolveCallbacks.forEach(callback => {
          callback(this.value)
        })
      }
    }

    const reject = error => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.error = error
        this.rejectCallbacks.forEach(callback => {
          callback(this.error)
        })
      }
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(resolveEvent, rejectEvent) {
    if (typeof resolveEvent !== 'function') resolveEvent = value => value
    if (typeof rejectEvent !== 'function') rejectEvent = error => { throw error }
    const subPromise = new MyPromise((resolve, reject) => {
      switch (this.state) {
        case 'pending': setTimeout(() => {
          this.resolveCallbacks.push(resolveEvent)
          this.rejectCallbacks.push(rejectEvent)
        }, 0);
        break;
        case 'fulfilled': setTimeout(() => {
          try {
            const result = resolveEvent(this.value)
            resolve(result)
          } catch (error) {
            reject(error)
          }
        }, 0);
        break;
        case 'rejected': setTimeout(() => {
          try {
            const result = rejectEvent(this.error)
            resolve(result)
          } catch (error) {
            reject(error)
          }
        }, 0);
        break;
      }
    })
    return subPromise
  }

  catch(rejectEvent) {
    return this.then(null, rejectEvent)
  }

  finally(fn) {
    fn()
    return this.then(value => value, error => { throw error })
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value))
  }

  static reject(error) {
    return new MyPromise((_, reject) => reject(error))
  }

  all(promises) {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([])
      } else {
        const result = []
        const length = promises.length
        for(let i = 0; i < length; i++) {
          promises[i].then(
            value => {
              result[i] = value
              if (++i === length) resolve(result)
            },
            error => reject(error)
          )
        }
      }
    })
  }

  catch(promises) {
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

  any(promises) {
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([])
      } else {
        const result = []
        const length = promises.length
        for (let i = 0; i < length; i++) {
          promises[i].then(
            value => resolve(value),
            error => {
              result[i] = error
              if (++i === length) reject(result)
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
// .then(res => console.log(res), e => console.error(e))
