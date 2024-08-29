export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
    let lastFunc: NodeJS.Timeout | null;
    let lastRan: number;
  
    return function (...args: Parameters<T>) {
      if (!lastRan) {
        func(...args);
        lastRan = Date.now();
      } else {
        if (lastFunc) {
          clearTimeout(lastFunc);
        }
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
  