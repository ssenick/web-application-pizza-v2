import {Header, Footer, PizzaBlock, Categories, Sort} from "./components";
import './scss/app.scss'
import {useEffect, useState} from "react";

function App() {
   const [isLoaded,setIsLoaded] = useState(false);
   const [pizzas,setPizzas] = useState([]);
   useEffect(() => {
      fetch('https://64a6157600c3559aa9c054f6.mockapi.io/items')
         .then(json => json.json())
         .then(response => {
            setPizzas(response)
            setIsLoaded(true)
         })
   },[])

   console.log(pizzas)
   return (
      <div className="App">



         <div className="wrapper">
            <Header/>
            <div className="content">
               <div className="container">
                  <div className="content__top">
                     <Categories/>
                     <Sort/>
                  </div>
                  <h2 className="content__title">All pizzas</h2>
                  <div className="content__items">
                     {isLoaded
                        ?
                        pizzas.map((item,index) => (
                           <PizzaBlock key={item.id} {...item}/>
                        ))
                        :
                        <h1>LOading..</h1>
                     }

                  </div>
               </div>
            </div>
            <Footer/>
         </div>

      </div>
   );
}

export default App;
