import {useCallback,useRef} from "react";
import {useDispatch} from "react-redux";

// export default function  useDebounce (delay) {
//    const timer = useRef();
//
//    const debouncedCallback  = useCallback((...arg) => {
//       if(timer.current){
//          clearTimeout(timer.current)
//       }
//       timer.current = setTimeout(() => {
//          callback(...arg);
//       }, delay)
//    },[delay])
//    return debouncedCallback;
// }
export default function  useDebounce (delay) {
   const timer = useRef();
   const dispatch = useDispatch()
   const debouncedCallback  = useCallback((slice) => {
      if(timer.current){
         clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
         dispatch(slice)
      }, delay)
   },[delay])
   return debouncedCallback;
}