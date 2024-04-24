addEventListener("copy", (e) => {
  e.preventDefault();
  e.clipboardData.setData("text", "我拦截了copy的数据");
});
