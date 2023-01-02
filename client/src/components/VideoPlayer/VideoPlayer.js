import React from "react";

const src = "https://www.youtube.com/embed/tgbNymZ7vqY";

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
