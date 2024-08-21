self.onmessage = function (e) {
  switch (e.data) {
    case "start":
      {
        let sum = 0;
        for (let i = 0; i < 1e9; i++) {
          sum += i;
        }
        self.postMessage("done");
      }
      break;
    default:
      console.error("Invalid message", e.data);
      break;
  }
  self.close();
};
