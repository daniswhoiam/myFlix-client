import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Minority Report', Description: 'Minority Report is a 2002 American science fiction action film based on the 1956 short story "The Minority Report" by Philip K. Dick. It is set primarily in Washington, D.C., and Northern Virgina in the year 2054, where PreCrime, a specialized Police Department, apprehends criminals based on foreknowledge provided by psychics called "precogs".', ImagePath: 'https://m.media-amazon.com/images/M/MV5BZTI3YzZjZjEtMDdjOC00OWVjLTk0YmYtYzI2MGMwZjFiMzBlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY1200_CR85,0,630,1200_AL_.jpg', Director: 'Steven Allan Spielberg', Genre: 'Science Fiction' },
        { _id: 2, Title: 'Saving Private Ryan', Description: 'Saving Private Ryan is a 1998 American epic war film. Set during the invasion of Normandy in World War II, the film is known for its graphic portrayal of war and for the intensity of its second scene of 24 minutes, a depiction of the Omaha Beach assault during the Normandy landings. The film follows US Army Rangars Captain John H. Miller and his squad as they search for a paratrooper, Private First Class James Francis Ryan, the last surviving brother of a family of four, with his three other brothers having been killed in action.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Saving_Private_Ryan_poster.jpg/220px-Saving_Private_Ryan_poster.jpg', Director: 'Steven Allan Spielberg', Genre: 'War Film' },
        { _id: 3, Title: 'Schindler\'s List', Description: 'Schindler\'s List is a 1993 American epic historical drama film. The film follows Oskar Schindler, a German industrialist who together with his wife Emilie Schindler saved more than a thousand mostly Polish-Jewish refugees from the Holocaust by employing them in his factories during World War II.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', Director: 'Steven Allan Spielberg', Genre: 'Historical Drama' }
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ?
          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie =>
            <MovieCard key={movie._id} movie={movie} onMovieClick={movie => { this.setSelectedMovie(movie); }} />
          )
        }
      </div>
    );
  }
}