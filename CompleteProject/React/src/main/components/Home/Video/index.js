import React from 'react';
require('./video.scss');

const Video = () =>{
  return (
    <div className="video">
    <div className="heading ">
      <p className="heading__secondary mt-lg border-bt">
        demonstration
      </p>
    </div>
    <div className="video__container">
      <iframe className="video__iframe" src="https://drive.google.com/file/d/1BfOGUycxRHUsX5hRpjmoD-kEI1WkKJy6/preview" ></iframe>
    </div>

  </div>
  );
}

export default Video;
