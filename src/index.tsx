import React, { Fragment, useRef, useState, useEffect } from "react";
import { getScreenStream, addStreamStopListener } from "./helpers/recordScreen.helper";
import RecordRTC from "recordrtc";
import { recording } from './interfaces/recording.interface';

var recorder : any;

const useScreenRecording = () => {
  const mediaElementRef : any = useRef();
  const canvasElementRef : any = useRef();
  const [blobVideoState, setBlobVideo] = useState(null);
  const [urlVideoState, setUrlVideoState] = useState<string>("");
  const [recordingProperties,setRecordingProperties] = useState<recording | undefined>(undefined);

  useEffect(()=> {
    recordingProperties != undefined && handleStartRecordRTC();
  },[recordingProperties]);

  const handleStartRecordRTC = () => {
    getScreenStream((screen : any) => {
      let inited = false;
      mediaElementRef.current.ontimeupdate = () => {
        if (!inited) {
          mediaElementRef.current.srcObject = screen;
          mediaElementRef.current.screen = screen;
          inited = true;
        }
        buildingCanvasFrame();
      };
      mediaElementRef.current.ontimeupdate();

      addStreamStopListener(screen, () => {
        handleStopRecording();
      });

      recorder = RecordRTC(canvasElementRef.current.captureStream(), {
        type: "video"
      });
      recorder.startRecording();
    });
  }

  const buildingCanvasFrame = () => {
    canvasElementRef.current.width = recordingProperties && recordingProperties.canvasWidth ;
    canvasElementRef.current.height = recordingProperties && recordingProperties.canvasHeigth;
    canvasElementRef.current
      .getContext("2d")
      .drawImage(
        mediaElementRef.current,
        recordingProperties && recordingProperties.screenX,
        recordingProperties && recordingProperties.screenY,
        recordingProperties && recordingProperties.screenWidth,
        recordingProperties && recordingProperties.screenHeigth,
        recordingProperties && recordingProperties.canvasX,
        recordingProperties && recordingProperties.canvasY,
        recordingProperties && recordingProperties.canvasWidth,
        recordingProperties && recordingProperties.canvasHeigth
      );
  };

  const handleStartRecording = (
    screenX : Number,
    screenY : any,
    screenWidth : Number,
    screenHeigth : Number,
    canvasX : Number =0,
    canvasY : Number =0,
    canvasWidth : Number=1500,
    canvasHeigth : Number=500
  ) => {
    setRecordingProperties({screenX,screenY: screenY+70,screenWidth,screenHeigth,canvasX,canvasY,canvasWidth,canvasHeigth});
  };

  const handleStopRecording = async () => {
    recorder.stopRecording(async function() {
      if (
        mediaElementRef.current.screen &&
        mediaElementRef.current.screen.getVideoTracks
      ) {
        mediaElementRef.current.screen.stop();
        mediaElementRef.current.screen = null;
        
        let blob = recorder.getBlob();
        setBlobVideo(blob);
        setUrlVideoState(URL.createObjectURL(blob));
        
        mediaElementRef.current.srcObject = null;
        mediaElementRef.current.src = URL.createObjectURL(blob);
      }
    });
  };
  const ScreenRecording = () => {
    return (
      <Fragment>
        <canvas
          ref={canvasElementRef}
          style={{ display: "none" }}
        ></canvas>
        <video
          style={{ display: "none" }}
          ref={mediaElementRef}
          autoPlay
          playsInline
        ></video>
      </Fragment>
    );
  };

  return {
    urlVideoState,
    blobVideoState,
    ScreenRecording,
    handleStartRecording,
    handleStopRecording
  };
};

export default useScreenRecording;
