export const delayByFPS = (fps = 30) => {
  let lastTime = 0;
  let timer = 0;
  const nextFrameTime = 1000 / fps;

  return (timeStamp: number, callback: <T>(...args: T[]) => void) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer <= nextFrameTime) timer += deltaTime;
    else {
      callback();
      timer = 0;
    }
  };
};
