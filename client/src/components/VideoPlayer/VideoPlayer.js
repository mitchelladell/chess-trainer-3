import React from "react";
import "./VideoPlayer.css";

const src = "https://www.youtube.com/embed/0mvwoxMdFkM";

const Video = () => {
  return (
    <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      width="300"
      height="200"
      allowFullScreen={true}
      src={src}
    ></iframe>
  );
};

export default Video;
