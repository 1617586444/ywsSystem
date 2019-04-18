//公共方法
var Vue = require('vue');
// Vue.http.options.credentials = true;

function post(url, param, dataForm = null, callBack, failBack = null) {
    let sessionId = sessionStorage.getItem('sessionId');
    let sendUrl = url + '?sessionId=' + sessionId;
    for (let item in dataForm) {
        sendUrl = sendUrl + "&" + item + '=' + dataForm[item];
    }
    Vue.default.http.post(sendUrl, param, {headers:{'sessionId':sessionId}, emulateJSON: true, credentials: true }).then(res => {
        callBack(res.data)
    }, res => {
        if (failBack) {
            failBack(res.data)
        }
    });
}
function postNoSess(url, param, dataForm = null, callBack, failBack = null) {
    // let sessionId = sessionStorage.getItem('sessionId');
    // let sendUrl = url + '?sessionId=' + sessionId;
    for (let item in dataForm) {
        sendUrl = sendUrl + "&" + item + '=' + dataForm[item];
    }
    Vue.default.http.post(url, param, {emulateJSON: true, credentials: true }).then(res => {
        callBack(res.data)
    }, res => {
        if (failBack) {
            failBack(res.data)
        }
    });
}
function get(url, param, dataForm = null, callBack, failBack = null) {
    let sessionId = sessionStorage.getItem('sessionId');
    let sendUrl = url + '?sessionId=' + sessionId;
    for (let item in dataForm) {
        sendUrl = sendUrl + "&" + item + '=' + dataForm[item];
    }
    Vue.default.http.get(sendUrl, param, { emulateJSON: true, credentials: true }).then(res => {
        callBack(res.data)
    }, res => {
        if (failBack) {
            failBack(res.data)
        }
    });
}
function getTwo(url, param, dataForm = null, callBack, failBack = null) {
  let sessionId = sessionStorage.getItem('sessionId');
  // let sendUrl = url + '?sessionId=' + sessionId;
  for (let item in dataForm) {
      let sendUrl = url + "&" + item + '=' + dataForm[item];
  }
  let headers = {
    sessionId: sessionId
  }
  Vue.default.http.get(url, param, { headers, emulateJSON: true, credentials: true }).then(res => {
      callBack(res.data)
  }, res => {
      if (failBack) {
          failBack(res.data)
      }
  });
}
function del(url, param, dataForm = null, callBack, failBack = null) {
    let sessionId = sessionStorage.getItem('sessionId');
    let sendUrl = url + '?sessionId=' + sessionId;
    for (let item in dataForm) {
        sendUrl = sendUrl + "&" + item + '=' + dataForm[item];
    }
    Vue.default.http.delete(sendUrl, param, { emulateJSON: true, credentials: true }).then(res => {
        callBack(res.data)
    }, res => {
        if (failBack) {
            failBack(res.data)
        }
    });
}

function formSubmit(url, param, callBack, failBack = null) {
    Vue.default.http.post(url, param, { headers: { 'Content-Type': 'multipart/form-data' }, emulateJSON: true }).then(res => {
        callBack(res.data)
    }, res => {
        if (failBack) {
            failBack(res.data)
        }
    });
}

function uploadFile(url, param, contentType, callBack = null, failBack = null) {   // 上传图片到阿里云
  let sessionId = sessionStorage.getItem('sessionId');
    // console.log('阿里云地址', url);
    Vue.default.http.put(url, param, { headers: { 'Content-Type': contentType}, emulateJSON: false }).then(res => {
        callBack(res.data)
    }, res => {
        if (failBack) {
            failBack(res.data)
        }
    });
}

function uploadVideo(url, param, contentType, onprogress = null, callBack = null, failBack = null) {   // 上传图片到阿里云
    console.log('阿里云地址', url);
    Vue.default.http.put(url, param, {
        headers: { 'Content-Type': contentType }, emulateJSON: false,
        progress: (e) => {
            onprogress(e);
        }
    }).then(res => {
        callBack(res.data)
    }, res => {
        if (failBack) {
            failBack(res.data)
        }
    });
}
function setCookie(name, value) {
    var Days = 2;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    // document.cookie = name + "=" + escape(value) ;
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
}

//读取cookie：
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

module.exports = {
    post: post,
    get: get,
    getTwo: getTwo,
    postNoSess: postNoSess,
    del: del,
    getCookie: getCookie,
    uploadFile: uploadFile,
    uploadVideo: uploadVideo,
}
