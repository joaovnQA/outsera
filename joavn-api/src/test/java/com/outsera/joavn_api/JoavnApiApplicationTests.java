package com.outsera.joavn_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application.properties")
public class JoavnApiApplicationTests {

    public static void main(String[] args) {
        SpringApplication.run(JoavnApiApplication.class, args);
	}

}
