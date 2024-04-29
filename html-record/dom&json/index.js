window.onload = function () {
  const app = document.querySelector(".app");
  const json = dom2json(app);
  console.log(json);
  const dom = json2dom(json);
  document.body.appendChild(dom);
};

function dom2json(dom) {
  const json = {
    tagName: dom.tagName,
    attributes: {},
    childNodes: [],
  };
  dom.getAttributeNames().forEach((key) => {
    json.attributes[key] = dom.getAttribute(key);
  });
  dom.childNodes.forEach((childNode) => {
    if (childNode.nodeType === 3 && !childNode.data.includes("\n")) {
      json.childNodes.push(childNode.data);
    } else if (childNode.nodeType === 1) {
      json.childNodes.push(dom2json(childNode));
    }
  });
  return json;
}

function json2dom(json) {
  if (typeof json === "string") return document.createTextNode(json);
  const dom = document.createElement(json.tagName);

  if (json.attributes) {
    Object.entries(json.attributes).forEach(([key, value]) => {
      dom.setAttribute(key, value);
    });
  }

  json.childNodes.forEach((childNode) => {
    dom.appendChild(json2dom(childNode));
  });

  return dom;
}
