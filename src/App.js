import {Routes,Route,Navigate} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from "./views/Home/Home.js"
import Blog from './views/BlogPage/Blog.js';
import Weather from './views/Weather/Weather.js';
import LoginForm from './views/Forms/LoginForm.js';
import ProfilePage from './views/Profile/Profile.js';
import { AuthContext } from './components/ActionContext/ActionContext.js';
import { useContext } from 'react';
import SiteMap from './components/SiteMap/SiteMap.js';
import About from "./views/About/About.js"
import Privacy from './views/PrivacyPolicy/Privacy';



function App() {

  const {user} = useContext(AuthContext)

  function isLoggedIn(){
    return false
  }

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/blog' element={<Blog/>}/>
        <Route exact path="/weather" element={<Weather />}/>
        <Route exact path="/login" element={<LoginForm/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/privacy" element={<Privacy/>}/>
        <Route exact path='/profile' element={user ? <ProfilePage/> : <Navigate to={"/login"}/>}/>
      </Routes>
      <SiteMap/>
    </div>
  );
}

export default App;
