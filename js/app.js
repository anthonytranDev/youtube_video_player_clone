requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/utils',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['action', 'component', 'constant', 'state'],
    function(action, component, constant, state) {

        // Event listener for the play/pause button
        playButton.addEventListener("click", function() {
            if (video.paused == true) {
                video.play();
                playButton.innerHTML = "Pause";
            } else {
                video.pause();
                playButton.innerHTML = "Play";
            }
        });
        // Pause the video when the slider handle is being dragged
        seekBar.addEventListener("mousedown", function() {
            video.pause();
        });

        // Play the video when the slider handle is dropped
        seekBar.addEventListener("mouseup", function() {
            video.play();
        });
        // Event listener for the mute button
        muteButton.addEventListener("click", function() {
            if (video.muted == false) {
                // Mute the video
                video.muted = true;

                // Update the button text
                muteButton.innerHTML = "Unmute";
            } else {
                // Unmute the video
                video.muted = false;
            }
        });
        // Event listener for the full-screen button
        fullScreenButton.addEventListener("click", function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen(); // Firefox
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen(); // Chrome and Safari
            }
        });
        // Event listener for the seek bar
        seekBar.addEventListener("change", function() {
            // Calculate the new time
            var time = video.duration * (seekBar.value / 100);

            // Update the video time
            video.currentTime = time;
        });
        // Update the seek bar as the video plays
        video.addEventListener("timeupdate", function() {
            // Calculate the slider value
            var value = (100 / video.duration) * video.currentTime;

            // Update the slider value
            seekBar.value = value;
        });
        // Event listener for the volume bar
        volumeBar.addEventListener("change", function() {
            // Update the video volume
            video.volume = volumeBar.value;
        });
    });