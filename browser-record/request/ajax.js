/* 形参说明:
  type: 请求的方法 GET POST
  url: 接口地址
  data: 发送的数据
  contentType: 数据编码 urlencoded json formdata,
  dataType: 返回来的数据类型 html json
  completed: function() {} ajax请求结束，回调函数
 */

const ajax = (params) =>
  new Promise((resolve, reject) => {
    try {
      if (params != undefined && typeof params == "object") {
        // ajax 过程

        // 1.创建 ajax 对象
        const xhr = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP");

        // 全局事件监控 onload
        xhr.onload = () => {
          params?.completed?.();
        };

        // 2.设置请求方法和接口地址
        if (params.type == "GET" && params.data != undefined) {
          xhr.open(params.type, `${params.url}?${params.data}`);
        } else {
          xhr.open(params.type, params.url);
        }

        // 3.设置数据编码
        if (
          params.contentType != undefined &&
          params.contentType != "formData"
        ) {
          switch (params.contentType) {
            case "urlencoded":
              xhr.setRequestHeader(
                "content-type",
                "application/x-www-form-urlencoded"
              );
              break;
            case "json":
              xhr.setRequestHeader("content-type", "application/json");
              break;
            default:
              xml.setRequestHeader(
                "content-type",
                "application/x-www-form-urlencoded"
              );
              break;
          }
        }

        // get方法带参数，省略params.contentType
        if (params.type == "GET" && params.data != undefined) {
          xhr.setRequestHeader(
            "content-type",
            "application/x-www-form-urlencoded"
          );
        }

        // 4.绑定 onreadystatechange 事件，监控 ajax 请求过程
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            var data = xhr.responseText;
            switch (params.dataType) {
              case "json":
                data = JSON.parse(data);
                break;
            }
            resolve(data);
          }
        };

        // 5.发送请求
        if (params.type == "POST" && params.data != undefined) {
          xhr.send(params.data);
        } else {
          xhr.send();
        }

        // 设置请求失败时的监听函数
        xhr.onerror = () => {
          reject(new Error("请求失败"));
        };

        // 设置超时
        xhr.timeout = 1000;
        xhr.ontimeout = () => {};
      } else {
        reject(new Error("参数不正确"));
      }
    } catch (e) {
      reject(e.message);
    }
  });
