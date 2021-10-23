//JAVASCRIPT FOR FRONT END LIVES HERE
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
const socket = io('/');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

peer.on('open', (id) => {
  socket.emit("join-room", ROOM_ID, id); //MUST BE SAME ON SERVER.JS
  console.log(id);
});



socket.on('user-connected', (userId) => {
    connectionToNewUser(userId, stream);
});

const connectionToNewUser = (userId) => {//Make use of peer to peer via WEBRTC and peerjs
    console.log('new user');
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}