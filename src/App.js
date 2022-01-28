import React, { useEffect, useState } from 'react';
import Tmdb from './Core/Api/Tmdb';
import './App.css';
import MovieRow from './Components/MovieRow/MovieRow';

export default () => {

  const [ movieList, setMovieList ] = useState( [] );

  useEffect( () =>{
    const getAll = async () => {
      const listAll = await Tmdb.getHomeList();
      setMovieList(listAll);
    }
    getAll();
  }, [] );

  return (
    <div className="page">
     <section className='lists'>
       {movieList.map((item, key) => (
         <div>
           <MovieRow key={key} title={item.title} items={item.items}/>
         </div>
       ))}
     </section>
    </div>
  );
}

