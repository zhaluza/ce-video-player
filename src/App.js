import React, { useState, useRef, useEffect, useCallback } from 'react';
import mandoVideo from './assets/mandalorian.mp4';
import './sass/app.scss';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  console.log(videoRef);

  const handleProgress = (currentTime, videoDuration) => {
    // setVideoProgress((currentTime / videoDuration) * 100);
    const progress = (currentTime / videoDuration) * 100;
    setCurrentTime(currentTime);
    if (!duration) setDuration(videoDuration);
    progressRef.current.style.flexBasis = `${progress}%`;
  };
  const togglePlay = (video) => {
    const toggle = video.paused ? 'play' : 'pause';
    video[toggle]();
    // handleProgress(video);
    setIsPlaying((prevState) => !prevState);
  };

  const handleVolume = (video, value) => {
    video.volume = value;
  };

  useEffect(() => {
    if (currentTime <= 3 || duration - currentTime <= 3) {
      setShowLogo(true);
    } else setShowLogo(false);
  }, [currentTime]);

  return (
    <div className="app">
      <div className="video__container">
        <video
          className={`video__player ${showLogo ? 'show-logo' : ''}`}
          src={mandoVideo}
          ref={videoRef}
          onTimeUpdate={(e) => {
            console.log(e.target.currentTime);
            handleProgress(e.target.currentTime, e.target.duration);
          }}
        ></video>
        {showLogo && <p>Show Logo</p>}
        <div className="video__controls">
          <div className="progress">
            <div className="progress__bar">
              <div className="bar__filled" ref={progressRef}></div>
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
              onChange={(e) => handleVolume(videoRef.current, e.target.value)}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
