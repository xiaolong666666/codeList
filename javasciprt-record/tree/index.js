const inputTree =
  [
    {
      id: 1,
      text: 'text1',
      children: [
        {
          id: 2,
          text: 'text2',
          parentId: 1,
          children: [
            {
              id: 4,
              text: 'text4',
              parentId: 2
            }
          ]
        },
        {
          id: 3,
          text: 'text3',
          parentId: 1
        }
      ]
    }
  ]

  // outputArray:
  // [
  //     { id: 4, text: 'text4', parentId: 2 },
  //     { id: 2, text: 'text2', parentId: 1 },
  //     { id: 3, text: 'text3', parentId: 1 },
  //     { id: 1, text: 'text1' },
  // ];

const inputArray = 
  [
    { id: 1, name: 'i1' },
    { id: 2, name: 'i2', parentId: 1 },
    { id: 4, name: 'i4', parentId: 3 },
    { id: 3, name: 'i3', parentId: 2 },
  ]

const tree2Array = (tree) => {
  let result = []
  if (Array.isArray(tree)) {
    tree.forEach(({ children, ...attribute }) => {
      if (Array.isArray(children) && children.length > 0) result.push(...tree2Array(children))
      result.push(attribute)
    })
  }
  return result
}

const array2tree = (array) => {
  const parents = array.filter(({ parentId }) => !parentId)
  const childrens = array.filter(({ parentId }) => !!parentId)
  const recursive = (parents, childrens) => {
    parents.forEach(parent => {
      childrens.forEach(children => {
        if (parent.id === children.parentId) {
          recursive([children], childrens)
          if (parent.children) {
            parent.children.push(children)
          } else {
            parent.children = [children]
          }
        }
      })
    })
  }
  recursive(parents, childrens)
  return parents
}

// const outputArray = tree2Array(inputTree)
// console.log('outputArray', outputArray)

const outputTree = array2tree(inputArray)
console.log('outputTree', outputTree)