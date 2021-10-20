//JAVASCRIPT FOR FRONT END LIVES HERE
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
const socket = io('/');
myVideo.muted = true;

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

socket.emit('join-room');//MUST BE SAME ON SERVER.JS

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}