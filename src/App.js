import React, { useEffect, useState } from 'react';
import Tmdb from './Core/Api/Tmdb';
import './App.css';
import FeaturedMovie from './Components/FeaturedMovie/FeaturedMovie';
import MovieRow from './Components/MovieRow/MovieRow';

export default () => {

  const [ movieList, setMovieList ] = useState( [] )
  const [ featuredData, setFeaturedData ] = useState( null )

  useEffect( () =>{
    const getAll = async () => {
      const listAll = await Tmdb.getHomeList()
      setMovieList(listAll)

      const originals = listAll.filter(i=>i.slug === 'originals')
      const ramdomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      const chosen = originals[0].items.results[ramdomChosen]
      const chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }
    getAll()
  }, [] );

  return (
    <div className="page">
      
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      
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

