
    let map = new Map([['{', '}'], ['(', ')'], ['[', ']']])
    console.log('map', map)

    const leetCode20 = (str = '') => {
      const stack = []
      for (let s of str) {
        if (map.has(s)) {
          stack.push(map.get(s))
        } else {
          if (stack.pop() !== s) return false
        }
        console.log('stack', stack)
      }
      if (stack.length === 0) {
        return true
      } 
      return false
    }
    leetCode20('[](){}')