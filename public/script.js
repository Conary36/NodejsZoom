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
    audio: false
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
    });

    socket.on("user-connected", (userId) => {
        setTimeout(() => {
            
      connectionToNewUser(userId, stream);
        }, 1000);
    });
})

peer.on('open', (id) => {
  socket.emit("join-room", ROOM_ID, id); //MUST BE SAME ON SERVER.JS
  console.log(id);
});





const connectionToNewUser = (userId, stream) => {//Make use of peer to peer via WEBRTC and peerjs
    // console.log('new user', userId);  
    const call = peer.call(userId, stream); //Call the new user
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    })
    call.on('close', () => {
        video.remove();
    });
}



const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}