package com.mainproject.seb43_main_023;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class Seb43Main023Application {

	public static void main(String[] args) {
		SpringApplication.run(Seb43Main023Application.class, args);
	}

}
