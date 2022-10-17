import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

// importing components
import Products from './routes/Products';

import Customers from './routes/Customers';

import Orders from './routes/Orders';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Products/>}/>

          <Route exact path="/customers" element={<Customers/>}/>

          <Route exact path="/orders" element={<Orders/>}/>

        </Routes>
      </BrowserRouter> 
    </>   
  );
}

export default App;
