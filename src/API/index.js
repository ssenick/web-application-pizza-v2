import axios from "axios";


export const fetchPizzas = (setItems, setIsError, setIsLoaded, sort, categoryId, search) => {
   const category = categoryId === 0 ? '' : `&category=${categoryId}`;
   const sortType = `?sortBy=${sort.type}&order=${sort.order}`;
   const searchValue = search ? `&name=${search}` : '';
   axios.get(`https://64a6157600c3559aa9c054f6.mockapi.io/items${sortType}${searchValue}${category}`)
      .then(res => setItems(res.data))
      .catch(err => setIsError(err.message))
      .finally(() => setIsLoaded(true))
}
export const fetchPizza = async (id) => {
  const response = await axios.get('https://64a6157600c3559aa9c054f6.mockapi.io/items/' + id )
    return response
}