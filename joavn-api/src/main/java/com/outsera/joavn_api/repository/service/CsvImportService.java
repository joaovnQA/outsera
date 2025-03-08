package com.outsera.joavn_api.service;

import com.outsera.joavn_api.model.Movie;
import com.outsera.joavn_api.repository.MovieRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;

@Service
public class CsvImportService {

    private static final Logger logger = LoggerFactory.getLogger(CsvImportService.class);

    @Autowired
    private MovieRepository movieRepository;

    @PostConstruct
    public void importMoviesFromCsv() {
        try {
            logger.info("Iniciando a importação do arquivo Movielist.csv.");
            
            Reader reader = new BufferedReader(new InputStreamReader(
                    new ClassPathResource("Movielist.csv").getInputStream(), "UTF-8"));

            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                    .withDelimiter(';')
                    .withFirstRecordAsHeader()
                    .withIgnoreHeaderCase()
                    .withTrim());

            int importedCount = 0;

            for (CSVRecord record : csvParser) {
                int year = Integer.parseInt(record.get("year"));
                String title = record.get("title");
                String studios = record.get("studios");
                String producers = record.get("producers");
                boolean winner = "yes".equalsIgnoreCase(record.get("winner"));

                Movie movie = new Movie(year, title, studios, producers, winner);
                movieRepository.save(movie);
                importedCount++;
            }

            logger.info("Importação de filmes concluída com sucesso. Total de filmes importados: {}", importedCount);

        } catch (Exception e) {
            logger.error("Erro ao importar o arquivo Movielist.csv: ", e);
        }
    }
}
