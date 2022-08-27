class MyURLSearchParams {
  KEYS = 'keys'
  VALUES = 'values'
  ENTRIES = 'entries'

  constructor(params) {
    this.paramsList = this.convertParams(params)
  }

  convertParams(params){
    const convertParams = params.includes('http') ? params.substr(params.indexOf('?') + 1) : params
    return convertParams.split('&')
  }

  append(key, value) {
    this.paramsList.push(`${key}=${value}`)
  }

  delete(key) {
    this.paramsList = this.paramsList
      .filter(item => item.split('=')[0] !== key)
  }

  get(key) {
    let result
    this.paramsList.forEach(item => {
      const [paramKey, paramValue] = item.split('=')
      if (paramKey === key && !result) result = paramValue
    })
    return result
  }

  getAll(key) {
    let result = []
    this.paramsList.forEach(item => {
      const [paramKey, paramValue] = item.split('=')
      if (paramKey === key) result.push(paramValue)
    })
    return result
  }

  has(key) {
    return this.paramsList
      .map(item => item.split('=')[0])
      .includes(key)
  }

  * [Symbol.interator](methodName) {
    const targets = this.paramsList
    .map(item => {
      const [paramKey, paramValue] = item.split('=')
      if (methodName === this.KEYS) {
        return paramKey
      } else if (methodName === this.VALUES) {
        return paramValue
      } else if (methodName === this.ENTRIES) {
        return [paramKey, paramValue]
      }
    })

    for (let target of targets) {
      yield target
    }
  }

  keys() {
    return this[Symbol.interator](this.KEYS)
  }

  values() {
    return this[Symbol.interator](this.VALUES)
  }

  entries() {
    return this[Symbol.interator](this.ENTRIES)
  }

  set(key, value) {
    const findIndex = this.paramsList
      .findIndex(item => item.split('=')[0] === key)
    this.paramsList = this.paramsList
      .filter((item, index) => !(item.split('=')[0] === key && index !== findIndex))
      .map(item => item.split('=')[0] === key ? `${key}=${value}` : item)
  }

  sort() {
    this.paramsList.sort()
  }

  toString() {
    return this.paramsList.join('&')
  }

}

const myParams = new MyURLSearchParams('name=tom&age=18&sex=boy')
