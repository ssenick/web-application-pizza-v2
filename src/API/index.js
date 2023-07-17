import axios from "axios";

// логика перенесена  в редакс

// export const fetchPizzas = (setItems, setIsError, setIsLoaded, sortType,orderType, categoryId, search) => {
//    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
//    const sort = `?sortBy=${sortType}`;
//    const order = `&order=${orderType}`;
//    const searchValue = search ? `&name=${search}` : '';
//    axios.get(`https://64a6157600c3559aa9c054f6.mockapi.io/items${sort}${order}${searchValue}${category}`)
//       .then(res => setItems(res.data))
//       .catch(err => setIsError(err.message))
//       .finally(() => setIsLoaded(true))
// }

export const fetchPizza = async (id) => {
  const response = await axios.get('https://64a6157600c3559aa9c054f6.mockapi.io/items/' + id )
    return response
}