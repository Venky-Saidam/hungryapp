import './App.css';
import { Routes, Route } from 'react-router-dom'; 

import { CartProvider} from './components/ContextReducer';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
       <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/createuser" element={<Signup/>} />
        <Route path="/myOrder" element={<MyOrder/>} />
      </Routes>
    </div>
    </CartProvider>
    
  );
}

export default App;
