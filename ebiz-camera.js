var cameraIndex = 1;
function changeCamera(idx) {
    var exArray = []; //存储设备源ID 
    MediaStreamTrack.getSources(function(sourceInfos) {
        for (var i = 0; i != sourceInfos.length; ++i) {
            var sourceInfo = sourceInfos[i];
            //这里会遍历audio,video，所以要加以区分  
            if (sourceInfo.kind === 'video') {
                exArray.push(sourceInfo.id);
            }
        }
        var videoObj = {
            video: {
                optional: [{
                    sourceId: exArray[idx] //0前置 1后置
                }]
            }
        };
        errBack = function(error) {
            console.log("Video capture error: ", error.code);
        };
        // Put video listeners into place  
        if (navigator.getUserMedia) { // Standard 如果用户允许打开摄像头  
            //stream为读取的视频流  
            navigator.getUserMedia(videoObj, function(stream) {
                cameraVideo.src = stream;
                cameraVideo.play();
            }, errBack);
        } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed  根据不同的浏览器写法不同  
            navigator.webkitGetUserMedia(videoObj, function(stream) {
                cameraVideo.src = window.webkitURL.createObjectURL(stream);
                cameraVideo.play();
            }, errBack);
        } else if (navigator.mozGetUserMedia) { // Firefox-prefixed  
            navigator.mozGetUserMedia(videoObj, function(stream) {
                cameraVideo.src = window.URL.createObjectURL(stream);
                cameraVideo.play();
            }, errBack);
        }
    });
}

function showCamera(callback) {
    $("#change-camera-btn").unbind("click");
    $("#change-camera-btn").bind("click",function(){
      if(cameraIndex==0){
        cameraIndex=1;
        changeCamera(cameraIndex);
      }else{
        cameraIndex=0;
        changeCamera(cameraIndex);
      }
    });
    $("#cameraBtn").unbind("click");
    $("#camera").show();
    changeCamera(1);
    $("#cameraBtn").bind("click", function() {
        cameraVideo.pause();
        var cameraCanvas = document.getElementById("cameraCanvas");
        var cameraContext = cameraCanvas.getContext("2d");
        cameraContext.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
        var src = cameraCanvas.toDataURL('image/jpeg');
        $("#camera").hide();
        $("#cameraBtn").unbind("click");
        callback(src);
    });
}
$(function(){
});