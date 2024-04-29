function findTargetElement(root, target = "") {
  const upperTarget = target.toUpperCase();
  const result = [];

  const dfs = (node) => {
    if (node.nodeName.toUpperCase() === upperTarget) {
      result.push(node);
    }
    if (node.childNodes) {
      node.childNodes.forEach((child) => {
        dfs(child);
      });
    }
  };

  dfs(root);

  return result;
}

const targetList = findTargetElement(document.body, "input");
console.log(targetList);
