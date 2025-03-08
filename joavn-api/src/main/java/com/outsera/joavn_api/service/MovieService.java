package com.outsera.joavn_api.service;

import com.outsera.joavn_api.model.Movie;
import com.outsera.joavn_api.repository.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private static final Logger logger = LoggerFactory.getLogger(MovieService.class);

    @Autowired
    private MovieRepository movieRepository;

    public Map<String, List<Map<String, Object>>> getProducersWithAwardIntervals() {
        logger.info("Iniciando o cálculo de intervalos de prêmios entre produtores.");

        List<Movie> winningMovies = movieRepository.findByWinnerTrue();

        if (winningMovies.isEmpty()) {
            logger.warn("Nenhum filme vencedor encontrado no banco de dados.");
            return Collections.emptyMap();
        }

        logger.info("Total de filmes vencedores encontrados: {}", winningMovies.size());

        Map<String, List<Integer>> producerWins = new HashMap<>();

        for (Movie movie : winningMovies) {
            String[] producers = movie.getProducers().split(", ");
            for (String producer : producers) {
                producerWins.computeIfAbsent(producer, k -> new ArrayList<>()).add(movie.getYear());
            }
        }

        List<Map<String, Object>> minIntervals = new ArrayList<>();
        List<Map<String, Object>> maxIntervals = new ArrayList<>();

        for (Map.Entry<String, List<Integer>> entry : producerWins.entrySet()) {
            String producer = entry.getKey();
            List<Integer> years = entry.getValue().stream().distinct().sorted().collect(Collectors.toList());

            if (years.size() < 2) continue;

            for (int i = 1; i < years.size(); i++) {
                int interval = years.get(i) - years.get(i - 1);
                if (interval > 0) { 
                    Map<String, Object> intervalData = new HashMap<>();
                    intervalData.put("producer", producer);
                    intervalData.put("interval", interval);
                    intervalData.put("previousWin", years.get(i - 1));
                    intervalData.put("followingWin", years.get(i));

                    minIntervals.add(intervalData);
                    maxIntervals.add(intervalData);
                }
            }
        }

        if (minIntervals.isEmpty()) {
            logger.warn("Nenhum produtor tem prêmios consecutivos válidos.");
            return Collections.emptyMap();
        }

        minIntervals.sort(Comparator.comparingInt(e -> (int) e.get("interval")));
        maxIntervals.sort((e1, e2) -> Integer.compare((int) e2.get("interval"), (int) e1.get("interval")));

        int minInterval = (int) minIntervals.get(0).get("interval");
        int maxInterval = (int) maxIntervals.get(0).get("interval");

        Map<String, List<Map<String, Object>>> result = new HashMap<>();
        result.put("min", minIntervals.stream().filter(e -> (int) e.get("interval") == minInterval).collect(Collectors.toList()));
        result.put("max", maxIntervals.stream().filter(e -> (int) e.get("interval") == maxInterval).collect(Collectors.toList()));

        logger.info("Cálculo dos intervalos de prêmios concluído com sucesso.");
        
        return result;
    }
}
