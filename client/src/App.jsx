import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

// importing components
import Products from './routes/Products';
import ProductUpdate from './routes/ProductUpdate';
import ProductDetail from './routes/ProductDetail';

import Clients from './routes/Clients';
import ClientUpdate from './routes/ClientUpdate';
import ClientDetail from './routes/ClientDetail';

import Orders from './routes/Orders';
import OrderUpdate from './routes/OrderUpdate';
import OrderDetail from './routes/OrderDetail';


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Products/>}/>
          <Route exact path="/products/:id/update" component={<ProductUpdate/>}/>
          <Route exact path="/products/:id" component={<ProductDetail/>}/>

          <Route exact path="/clients" element={<Clients/>}/>
          <Route exact path="/clients/:id/update" component={<ClientUpdate/>}/>
          <Route exact path="/clients/:id" component={<ClientDetail/>}/>

          <Route exact path="/orders" element={<Orders/>}/>
          <Route exact path="/orders:id/update" component={<OrderUpdate/>}/>
          <Route exact path="/orders/:id" component={<OrderDetail/>}/>
        </Routes>
      </BrowserRouter> 
    </>   
  );
}

export default App;
