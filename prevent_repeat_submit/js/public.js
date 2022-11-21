(function(){
    var $ = {};

    // addEvent.js
    // elem: 事件
    // eventType: 事件类型
    // func：触发的方法

    function addEvent(param) {
        try {
            if (typeof param.elem == "object" && param.elem != null) {
                if (window.addEventListener) {
                    param.elem.addEventListener(param.eventType, param.func);
                } else {
                    param.elem.attachEvent("on" + param.eventType, param.func);
                }
            } else {
                throw new Error("不是对象或对象为空");
            }
        } catch (e) {
            alert(e.message);
        }
    }
    // addEvent.js

    // ajax.js
    // type: 请求的方法
    // url：接口地址
    // data：发送的数据
    // contentType：数据编码 urlencoded  formData  json
    // dataType：返回来的数据类型  html  json
    // success: function(data){} 数据能够用后执行的函数
    // completed：function(){} 数据已经返回后执行的函数

    function ajax(param) {
        try {
            if (param != undefined && typeof param == "object") {
                if (window.XMLHttpRequest) {
                    var xml = new XMLHttpRequest();
                } else {
                    var xml = new ActiveXObject("Microsoft.XMLHTTP");
                }

                // 设置全局事件监控
                xml.onload = function () {
                    if (param.completed != undefined) {
                        param.completed();
                    }
                }

                // 设置发送方法和接口地址
                if (param.type == "GET" && param.data != undefined) {
                    xml.open(param.type, param.url + "?" + param.data);
                } else {
                    xml.open(param.type, param.url);
                }

                // 设置数据编码
                if (param.contentType != undefined && param.contentType != "formData") {
                    switch (param.contentType) {
                        case "urlencoded": 
                        xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); break;
                        case "json": 
                        xml.setRequestHeader("Content-type", "application/json");
                        break;
                        default: xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); break;
                    }
                }

                // 绑定onreadystatechange，监控全局事件
                xml.onreadystatechange = function () {
                    if (xml.readyState == 4 && xml.status == 200) {
                        var data = xml.responseText;
                        switch (param.dataType) {
                            case "json": data = JSON.parse(data); break;
                        }
                        param.success(data);
                    }
                }

                // 发送数据
                if (param.type == "POST" && param.data != undefined) {
                    xml.send(param.data);
                } else {
                    xml.send();
                }
            } else {
                throw new Error("参数不正确");
            }
        } catch (e) {
            alert(e.message);
        }
    }
    // ajax.js

    $.addEvent = addEvent;
    $.ajax = ajax;
    window.$ = $;
})();