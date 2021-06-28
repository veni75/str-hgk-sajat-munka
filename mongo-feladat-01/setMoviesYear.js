function setYearToMovies() {
    const titles = ["Star wars", "Utazás Dardzsilingbe", "Jurassic Park", "Terminal", "Párbaj", "Az igazság útja", "Avatar", "Terminator", "Titanic", "Alkonyat"];
    const year = [1981, 1982, 1983, 1991, 1994, 1997, 2003, 2007, 2009,2000];
    for (let i = 0; i < 10; i += 1) {
        db.movies.updateOne({ title: titles[i] }, { $set: { releaseYear: year[i] } });
    }
}
setYearToMovies();