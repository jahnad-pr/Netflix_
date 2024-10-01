import './css/App.css';
import './css/Invalid.css';
import './css/Category.css';
import './css/Popup.css';
import './css/acterCart.css'
import './css/search.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Main/Header';
import Home from './components/Pages/Home';
import Footer from './components/Main/Footer';
import Popup from './components/Main/Popup';
import Loading from './components/Main/Loading';
import { MainContext } from './components/context/MainContext';
import { useEffect, useRef, useState } from 'react';
import TvShows from './components/Pages/TvShows';
import Movies from './components/Pages/Movies';
import NewAndPopuler from './components/Pages/NewAndPopuler';
import Invalid from './components/Pages/Invalid';
import Search from './components/Main/Search';
import LoginPage from './components/Main/LoginPage';

// Main app
function App() {
  const bg = useRef(null);
  const [rendData, setRendData] = useState();
  const [inputValue, setInputValue] = useState('');
  const [con, setCon] = useState(false)
  const [lodSuccess, setLoadSuccess] = useState(false)
  const [img, setImg] = useState(false)
  const location = useLocation()



  // Fetch Random Movie
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=fd3ac1ee9573a823d516f233cfa108a4&')
      .then(res => res.json())
      .then(data => {
        const rem = data.results[Math.floor(Math.random() * data.results.length)];
        setImg(`url('http://image.tmdb.org/t/p/original${rem.backdrop_path}')`)
        setRendData({
          all: rem,
          title: rem.original_title,
          ov: rem.overview,
          pop: rem.vote_average,
          rd: rem.release_date,
        });
      });
  }, []);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/home' || location.pathname === '/sign') {
      bg.current.style.backgroundImage = img
    } else { bg.current.style.backgroundImage = '' }
  }, [location.pathname])




  return (
    <>
      <div ref={bg} id="bismillah">
        <div id="rooot">
          <MainContext>
            <Loading setLoadSuccess={setLoadSuccess} />
            <Header inputValue={inputValue} setInputValue={setInputValue} />
            <div className='Body'>
              <Routes>
                <Route path='/sign' element={<LoginPage setCon={setCon} con={con} />} />
                <Route exact path='/' element={<Home lodSuccess={lodSuccess} con={con} data={rendData} />} />
                <Route path='/home' element={<Home lodSuccess={lodSuccess} con={con} data={rendData} />} />
                <Route path='/tvShows' element={<TvShows />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/new-popular' element={<NewAndPopuler />} />
                <Route path='*' element={<Invalid />} />
              </Routes>
            </div>
            <Popup />
            <Search Search={inputValue} />
            <Footer lodSuccess={lodSuccess} />
          </MainContext>
        </div>
      </div>
    </>

  );
}

// Exporting to root
export default App;
