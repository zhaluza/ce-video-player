import React, { useState, useRef, useEffect } from 'react';
import mandoVideo from './assets/mandalorian.mp4';
import mandoVideoPreview from './assets/mandolorian-preview.gif';
import babyYoda from './assets/baby-yoda.svg';
import './sass/app.scss';

const Video = () => {
  const [previewOff, setPreviewOff] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const [logoPosition, setLogoPosition] = useState('left');
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  const handleProgress = (currentTime, videoDuration) => {
    // setVideoProgress((currentTime / videoDuration) * 100);
    const progress = (currentTime / videoDuration) * 100;
    setCurrentTime(currentTime);
    if (!duration) setDuration(videoDuration);
    progressRef.current.style.flexBasis = `${progress}%`;
  };
  const togglePlay = (video) => {
    if (!previewOff) setPreviewOff(true);
    const toggle = video.paused ? 'play' : 'pause';
    video[toggle]();
    handleProgress(video);
    setIsPlaying((prevState) => !prevState);
  };

  const handleVolume = (video, value) => {
    video.volume = value;
  };

  const handleSkip = (num) => {
    videoRef.current.currentTime += num;
  };

  useEffect(() => {
    if (currentTime <= 3) {
      setShowLogo(true);
    } else if (duration - currentTime <= 3) {
      setShowLogo(true);
      setLogoPosition('right');
    } else if (currentTime > 3 && currentTime < duration - 3) {
      setShowLogo(false);
    }
  }, [currentTime]);
  // TODO: Click progress bar to adjust video progress
  // TODO: General styling
  return (
    <div className="video__container">
      <video
        className="video__player"
        ref={videoRef}
        onTimeUpdate={(e) => {
          handleProgress(e.target.currentTime, e.target.duration);
        }}
        onEnded={() => setIsPlaying(false)}
        src={mandoVideo}
        poster={mandoVideoPreview}
      ></video>

      <img
        className={`baby-yoda ${showLogo && previewOff ? 'show-logo' : ''} ${
          logoPosition === 'left' && 'logo-left'
        } ${logoPosition === 'right' && 'logo-right'}`}
        src={babyYoda}
        alt="Baby Yoda"
      />
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
          <button onClick={() => handleSkip(-5)}>-5s</button>
          <button onClick={() => handleSkip(5)}>+5s</button>
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
  );
};

export default Video;
