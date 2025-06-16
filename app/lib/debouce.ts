type Callback = () => void;

export function debounce(callback: Callback, delay: number = 1000): Callback {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function () {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback();
      timeoutId = null;
    }, delay);
  };
}
