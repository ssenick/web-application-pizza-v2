import {Header, Footer, PizzaBlock, Categories, Sort} from "./components";
import './scss/app.scss'

function App() {
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
                  <h2 className="content__title">Все пиццы</h2>
                  <div className="content__items">
                     <PizzaBlock/>
                  </div>
               </div>
            </div>
            <Footer/>
         </div>

      </div>
   );
}

export default App;
