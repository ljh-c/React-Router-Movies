import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [savedList, setSavedList] = useState( [] );

  const addToSavedList = movie => {
    setSavedList( [...savedList, movie] );
  };

  const removeFromSaved = movie => {
    console.log(savedList);
    let newList = [];
    for (let i = 0; i < savedList.length; i++) {
      if (savedList[i].title !== movie.title) {
        newList.push(savedList[i]);
      }
    }
    setSavedList( newList );
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/">
        <MovieList />
      </Route>
      <Route path="/movies/:movieId">
        <Movie 
          addToSavedList={addToSavedList} 
          removeFromSaved={removeFromSaved} 
          savedList={savedList}
        />
      </Route>
    </div>
  );
};

export default App;
