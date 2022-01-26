export function downloadFile(reqUrl, successCallback, failCallback) {

  var xhr = new XMLHttpRequest();
  console.log('reqUrl -> ', reqUrl)
  xhr.open('GET', 'http://localhost:8080/fileController/download', true);
  console.log('open -> ', reqUrl)
  xhr.send();
  // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'blob';
  console.log(0);
  xhr.onload = function (e) {
    console.log(11)
    if (this.status === 200) {
      var type = xhr.getResponseHeader('Content-Type');
      var blob = new Blob([this.response], {type:type})
      var URL = window.URL || window.webkitURL;
      var fileUrl = URL.createObjectURL(blob);
      successCallback(fileUrl);
    } else {
      console.log(22)
      failCallback(e);
    }
  }
}