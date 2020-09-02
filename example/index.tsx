import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ReactPlayer from "react-player"; 

import useScreenRecording from "use-screen-recording-yl";
import { useRef, useState } from 'react';

const App = () => {
  const refContainer: any = useRef();
  const player = useRef(null);
  const {
    urlVideoState,
    blobVideoState,
    ScreenRecording,
    handleStartRecording,
    handleStopRecording,
  } = useScreenRecording();
  const [isVisible,setVisible] = useState(false);

  const handleClickStart = () => {
    setVisible(false);
    handleStartRecording(
      refContainer.current.getBoundingClientRect().x,
      refContainer.current.getBoundingClientRect().y,
      refContainer.current.getBoundingClientRect().width,
      refContainer.current.getBoundingClientRect().height,
      0,
      0,
      500,
      500
    );
  };

  const handleClickStop = () => {
    handleStopRecording();
  };

  const handleClickShow = () => {
    setVisible(true);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScreenRecording />
      <h2>Image for testing</h2>
      <img
        ref={refContainer}
        src="https://www.chess.com/bundles/web/images/offline-play/standardboard.6a504885.png"
        alt=""
        width="500"
        height="500"
      />
      <button onClick={handleClickStart}>Start Recording</button>
      <button onClick={handleClickStop}>Stop Recording</button>
      <button onClick={handleClickShow}>Show Video</button>

      { isVisible && <ReactPlayer
        width="500"
        height="500"
        controls={true}
        url={urlVideoState}
        ref={player}
      />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
