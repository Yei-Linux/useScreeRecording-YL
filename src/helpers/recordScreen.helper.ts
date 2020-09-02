export const getScreenStream  = (callback : any) => {
    const mediaDevices = navigator.mediaDevices as any;
     if (mediaDevices.getDisplayMedia) {
        mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        }).then((screenStream : any) => {
            callback(screenStream);
        });
    } else {
        alert('getDisplayMedia API is not supported by this browser.');
    }
}

export const addStreamStopListener = (stream : any, callback : any) => {
    stream.addEventListener('ended', function() {
        callback();
        callback = function() {};
    }, false);
    stream.addEventListener('inactive', function() {
        callback();
        callback = function() {};
    }, false);
    stream.getTracks().forEach(function(track : any) {
        track.addEventListener('ended', function() {
            callback();
            callback = function() {};
        }, false);
        track.addEventListener('inactive', function() {
            callback();
            callback = function() {};
        }, false);
    });
}

