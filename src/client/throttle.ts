// https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf

export const throttle = (func: Function, limit): any => {
  let lastFunc
  let lastRan
  return function () {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

export const animateThrottle = (
  func: Function
): { f: (...args: any[]) => void; abort: () => void } => {
  let run = true
  let frame: number
  let args
  let run_last: boolean = false
  const f = function () {
    const context = this
    args = arguments
    if (run) {
      run = false
      run_last = false
      func.apply(context, args)
      frame = requestAnimationFrame(function () {
        run = true
        if (run_last) {
          run_last = false
          func.apply(context, args)
        }
      })
    } else {
      run_last = true
    }
  }

  const abort = () => {
    if (frame !== undefined) {
      cancelAnimationFrame(frame)
      frame = undefined
    }
  }

  return { f, abort }
}
