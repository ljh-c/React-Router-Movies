import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './MovieCard';

const Movie = (props) => {
  const [movie, setMovie] = useState();

  const { movieId } = useParams();

  const [saved, setSaved] = useState(false);

  const savedList = props.savedList;

  useEffect(() => {
    const id = movieId;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

      axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[movieId]);
  
  // Uncomment this only when you have moved on to the stretch goals
  const addSavedMovie = () => {
    const addToSavedList = props.addToSavedList;
    if (!saved) {
      addToSavedList(movie);
      setSaved(true);
    } 
  }

  const removeSavedMovie = () => {
    const removeFromSaved = props.removeFromSaved;
    
      removeFromSaved(movie);
      setSaved(false);
    
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  console.log('saved list is', savedList);
  console.log('movie title is', movie.title);



  // const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      {saved || savedList.map(movie => movie.title).includes(movie.title) ? 
        (<div className="delete-button" onClick={removeSavedMovie}>Remove</div>) :
        (<div className="save-button" onClick={addSavedMovie}>Save</div>)
      }
    </div>
  );
}

export default Movie;