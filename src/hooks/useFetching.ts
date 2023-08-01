import { useState} from "react";



export function useFetching(callback : () => void) {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | any>('');

   const fetching = async () => {
      try {
         setIsLoading(true)
         await callback()
      } catch (e: any ) {
         setError(e)
      } finally {
         setIsLoading(false)
      }
   }
   return [fetching, isLoading, error]
}