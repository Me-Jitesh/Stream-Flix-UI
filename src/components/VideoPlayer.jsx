import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import Hls from "hls.js";
import "video.js/dist/video-js.css";
import toast from "react-hot-toast";

function VideoPlayer({ src, poster }) {
    const vidRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {

        //for initialization

        playerRef.current = videojs(vidRef.current, {
            controls: true,
            // autoplay: true,
            // muted: true,
            // preload: "auto",
            download: true,
        });

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(vidRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                vidRef.current.play();
            });
        } else if (vidRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            vidRef.current.src = src;
            vidRef.current.addEventListener("canplay", () => {
                vidRef.current.play();
            });
        } else {
            console.log("Can't Play ! Unsuported File");
            toast.error("Can't Play ! Unsuported File");
        }
    }, [src]);

    return (
        <div data-vjs-player>
            <video
                ref={vidRef}
                poster={poster}
                style={{
                    width: "300px",
                    height: "300px",
                }}
                className="video-js vjs-control-bar"
            ></video>
        </div>
    );
}

export default VideoPlayer;