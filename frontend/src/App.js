import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Bag from './Pages/Bag';
import LoginSignup from './Pages/LoginSignup';
import Category from './Pages/Category';
import Footer from './Components/Footer/Footer';
import banner_feminino from './Components/Assets/banner_feminino.png';
import banner_masculino from './Components/Assets/banner_masculino.png';
import banner_acessorios from './Components/Assets/banner_acessorios.png';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/feminino' element={<Category banner={banner_feminino} categoria='feminino'/>}/>
          <Route path='/masculino' element={<Category banner={banner_masculino} categoria='masculino'/>}/>
          <Route path='/acessorios' element={<Category banner={banner_acessorios} categoria='acessorios'/>}/>
          <Route path='/produto' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/sacola' element={<Bag/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
