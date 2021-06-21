const MovieAPI = require('./movie.api');

module.exports = class MovieService {
    constructor() {
        this.api = new MovieAPI('./database/movies.json', 'movies');
        this.movies = null;
        this.init();
    }

    async init() {
        this.movies = await this.api.get();
    }

    async getAllMovies() {
        if (!this.movies) {
            await this.init();
        }
        return await this.movies;
    }

    async findMovieById(id) {
        if (!this.movies) {
            await this.init();
        }
        return await this.movies.find(movie => movie.id === id);
    }

    generateNewMovieId() {
        const sortedMovies = [...this.movies].sort((a, b) => a.id > b.id)
        return sortedMovies[sortedMovies.length - 1].id + 1
    }

    async createMovie({ producer, title }) {
        if (!this.movies) {
            await this.init();
        }
        const movie = { id: this.generateNewMovieId(), producer, title }
        this.movies = [...this.movies, movie]
        this.api.save(this.movies)

        return await this.movie;
    }


    async editMovie({ id, producer, title }) {
        if (!this.movies) {
            await this.init();
        }

        this.movies = this.movies.map(movie => movie.id === id ? { id, producer, title } : movie)
        this.api.save(this.movies)
        return this.findMovieById(id)
        
    }

    async removeMovie(id) {
        if (!this.movies) {
            await this.init();
        }
        this.movies = this.movies.filter(movie => movie.id !== id)
        this.api.save(this.movies)
        
    }

}


