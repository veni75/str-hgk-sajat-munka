const MoviesService = (moviesApi) => {
    let movies = moviesApi.get()
  
    const getAllMovies = async () => await movies
  
    const findMovieById = async (id) => await movies.find(movie => movie.id === id)
  
    const generateNewMovieId = () => {
      const sortedMovies = [...movies].sort((a, b) => a.id > b.id)
      return sortedMovies[sortedMovies.length - 1].id + 1
    }
  
    const createMovie = async ({ producer, title }) => {
      const movie = { id: generateNewMovieId(), producer, title }
      movies = [...movies, movie]
      await moviesApi.save(movies)
      return movie
    }
  
    const editMovie = async ({ id, producer, title }) => {
      movies = await movies.map(movie => movie.id === id ? { id, producer, title } : movie)
      await moviesApi.save(movies)
      return findMovieById(id)
    }
  
    const removeMovie = async (id) => {
      movies = await movies.filter(movie => movie.id !== id)
      await moviesApi.save(movies)
    }
  
    return {
      getAllMovies,
      findMovieById,
      createMovie,
      editMovie,
      removeMovie
    }
  }
  
  module.exports = MoviesService