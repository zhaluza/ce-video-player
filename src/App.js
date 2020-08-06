import React, { useState, useRef } from 'react';
import mandoVideo from './assets/mandalorian.mp4';
import './sass/app.scss';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = (video) => {
    const toggle = video.paused ? 'play' : 'pause';
    video[toggle]();
    setIsPlaying((prevState) => !prevState);
  };
  return (
    <div className="app">
      <div className="video__container">
        <video className="video__player" src={mandoVideo} ref={videoRef}></video>
        <div className="video__controls">
          <div className="progress">
            <div className="progress__bar">
              <div className="bar__filled"></div>
            </div>
            <div className="progress__time"></div>
          </div>
          <div className="controls__bottom">
            <button title="play video" onClick={() => togglePlay(videoRef.current)}>
              {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
            </button>
            <button>-10s</button>
            <button>+10s</button>
            <input
              type="range"
              className="slider"
              id="volume-slider"
              min="0"
              max="1"
              step=".1"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
