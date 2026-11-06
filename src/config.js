export function timeout(sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
}

export const LOAD_SEC = 3;
