import {Routes,Route,Navigate} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from "./views/Home/Home.js"
import Blog from './views/BlogPage/Blog.js';
import Weather from './views/Weather/Weather.js';



function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/blog' element={<Blog/>}/>
        <Route exact path="/weather" element={<Weather />}/>
      </Routes>
    </div>
  );
}

export default App;
