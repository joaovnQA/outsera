package com.outsera.joavn_api.controller;

import com.outsera.joavn_api.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/award-intervals")
    public Map<String, List<Map<String, Object>>> getProducersWithAwardIntervals() {
        return movieService.getProducersWithAwardIntervals();
    }
}
