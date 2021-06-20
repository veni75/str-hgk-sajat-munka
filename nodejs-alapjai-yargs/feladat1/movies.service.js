const MoviesService = (moviesApi) => {
  
  const getAllMovies = async () => await moviesApi.get()

  const findMovieById = async (id) => {
    let movies = await moviesApi.get()
    movies.find(movie => movie.id === id)
  }

  const generateNewMovieId = () => {
    let movies = await moviesApi.get()
    const sortedMovies = [...movies].sort((a, b) => a.id > b.id)
    return sortedMovies[sortedMovies.length - 1].id + 1
  }

  const createMovie = ({ producer, title }) => {
    let movies = await moviesApi.get()
    const movie = { id: generateNewMovieId(), producer, title }
    movies = [...movies, movie]
    moviesApi.save(movies)
    return movie
  }

  const editMovie = ({ id, producer, title }) => {
    let movies = await moviesApi.get()
    movies = movies.map(movie => movie.id === id ? { id, producer, title } : movie)
    moviesApi.save(movies)
    return findMovieById(id)
  }

  const removeMovie = (id) => {
    let movies = await moviesApi.get()
    movies = movies.filter(movie => movie.id !== id)
    moviesApi.save(movies)
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