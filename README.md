<div align="center">
  <a href="#">
  	<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThUwv9Nu44KYHhCd3U7I-YWS-glbCRGNOzyw&usqp=CAU" alt="Logo project" height="160" />
  </a>
  <br>
  <br>
  <p>
    <b>useScreenRecording-yl</b>
  </p>
  <p>
     <i>Hook for recording an specific element on screen</i>
  </p>
</div>

---

**Content**

* [Features](##features)
* [Install](##install)
* [Usage](##usage)
* [Exemples](##exemples)
* [Documentation](##documentation)
* [API](##Api)
* [Contributing](##contributing)
* [Maintainers](##maintainers)

## Features ✨
* Easy to use.
* Continuously Maintained.

## Install 🐙
You can install useRecording-yl by entering this command

```
npm i use-recording-yl
```

## Usage 💡
This package is for recording element on screen and it will generate blob video and url video of recording.

## Exemples 🖍
```
  const refContainer: any = useRef();
  const {
    urlVideoState,
    blobVideoState,
    ScreenRecording,
    handleStartRecording,
    handleStopRecording,
  } = useScreenRecording();
  ...
  const handleClickStart = () => {
    setVisible(false);
    handleStartRecording(
      refContainer.current.getBoundingClientRect().x,
      refContainer.current.getBoundingClientRect().y,
      refContainer.current.getBoundingClientRect().width,
      refContainer.current.getBoundingClientRect().height,
      0, //By Default is 0
      0, //By Default is 0
      500,//By Default is 1500
      500 //By Default is 500
    );
  };

  const handleClickStop = () => {
    handleStopRecording();
  };
  ...
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
      ...
    </div>
  );
```

## Contributing 🍰
Please make sure to read the [Contributing Guide]() before making a pull request.

Thank you to all the people who already contributed to this project!

## Maintainers 👷
<table>
  <tr>
    <td align="center"><a href="https://github.com/Yei-Linux"><img src="https://avatars1.githubusercontent.com/u/38733057?s=60&v=4" width="100px;" alt="Yei Linux"/><br /><sub><b>Yei Linux</b></sub></a><br /><a href="#" title="Code">💻</a></td>
  </tr>
</table>

## License ⚖️
Enter what kind of license you're using.

---