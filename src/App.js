import React from 'react';
import Video from './Video';
import mandoVideo from './assets/mandalorian.mp4';
import mandoVideoPreview from './assets/mandolorian-preview.gif';
import babyYoda from './assets/baby-yoda.svg';
import './sass/app.scss';

const App = () => {
  return (
    <div className="app">
      <Video video={mandoVideo} preview={mandoVideoPreview} logo={babyYoda} skipInterval={5} />
    </div>
  );
};
export default App;
