package com.outsera.joavn_api.service;

import com.outsera.joavn_api.model.Movie;
import com.outsera.joavn_api.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Optional<Movie> updateMovie(Long id, Movie updatedMovie) {
        return movieRepository.findById(id).map(existingMovie -> {
            existingMovie.setTitle(updatedMovie.getTitle());
            existingMovie.setStudios(updatedMovie.getStudios());
            existingMovie.setProducers(updatedMovie.getProducers());
            existingMovie.setYear(updatedMovie.getYear());
            existingMovie.setWinner(updatedMovie.isWinner());
            return movieRepository.save(existingMovie);
        });
    }

    public boolean deleteMovie(Long id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
