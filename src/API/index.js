import axios from "axios";


export  const fetchPizzas = (setItems,setIsError,setIsLoaded,sort,categoryId ) => {
   const category = categoryId === 0 ? '' : `&category=${categoryId}`;
   const sortType = `?sortBy=${sort.type}&order=${sort.order}`;
   axios.get(`https://64a6157600c3559aa9c054f6.mockapi.io/items${sortType}${category}` )
      .then(res => setItems(res.data))
      .catch(err => setIsError(err.message))
      .finally(()=>setIsLoaded(true))
}