export const LOAD_SEC = 3;
export function timeout(sec = LOAD_SEC) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
}

export function rndNumber(max, min = 1) {
  return Math.floor(Math.random() * (max - min) + min);
}

