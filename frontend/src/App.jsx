
import './App.css'
import { Routes, Route, Navigate } from "react-router";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';

import {checkAuth} from "./authSlice/"; // u can't call it directly, 've to use useDispatch
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect } from 'react';
import Admin from './pages/Admin';
import AdminDelete from "./components/AdminDelete"
import AdminCreate  from './components/AdminCreate';
import AdminUpdate from './components/AdminUpdate';
import AdminUpdateProblem from './components/AdminUpdateProblem';
import AdminVideo from "./components/AdminVideo"
import AdminUpload from "./components/AdminUpload"
import MakeAdmin from './components/MakeAdmin';

import ProblemPage from "./pages/ProblemPage"
function App() {
  
  // first we'll check wheather user is authentic or not[Login or not]
  // if not-> navigate to login

  // first read the isAuthenticated var from slice using useSelector[which give u access of whole slice]
  const {user,isAuthenticated,loading} = useSelector((state)=>state.auth); // auth is slice name
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }
  
  return (
    <>
   
     <Routes>

      <Route path='/' element={<Landing />}></Route>
      <Route path='/problems' element={ isAuthenticated ? <Home></Home> : <Navigate to="/login"/>}></Route>
      <Route path='/login' element={ isAuthenticated ? <Navigate to="/problems"/> : <Login></Login>}></Route>
      <Route path='/signup' element={isAuthenticated ? <Navigate to="/problems"/> : <Signup></Signup>}></Route>
      <Route path='/admin' element={ isAuthenticated && user?.role == 'admin' ? <Admin/> : <Navigate to='/login'/> }></Route>
      <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminCreate /> : <Navigate to="/login" />} />
      <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/login" />} />
      <Route path="/admin/update" element={isAuthenticated && user?.role === 'admin' ? <AdminUpdate /> : <Navigate to="/login" />} />
      <Route path="/admin/update/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpdateProblem /> : <Navigate to="/login" />} />
      <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/login" />} />
      <Route path="/admin/upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/login" />} />
      <Route path="/admin/makeAdmin" element={isAuthenticated && user?.role === 'admin' ? <MakeAdmin /> : <Navigate to="/login" />} />
     
      <Route path="/problem/:problemId" element={isAuthenticated ? <ProblemPage/> : <Navigate to="/login" />}></Route>
      
     </Routes>
    </>
  )
}

export default App


// user?.role if user is not null 