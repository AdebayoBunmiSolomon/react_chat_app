import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return (<Navigate to='/' />)
    }

    return children
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
    // <div className='app'>
    //   {/* <Home /> */}
    //   <div className='app-detail'>
    //     <div>
    //       <p>Paragraph 1</p>
    //     </div>
    //     <div>
    //       <p>Paragraph 2</p>
    //     </div>
    //     <div>
    //       <p>Paragraph 3</p>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
