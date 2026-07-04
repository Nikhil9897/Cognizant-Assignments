package com.cognizant.orm_learn;

import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OrmLearnApplication implements CommandLineRunner {

	@Autowired
	private CountryService service;

	public static void main(String[] args) {
		SpringApplication.run(OrmLearnApplication.class, args);
	}

	@Override
	public void run(String... args) {

		service.addCountry(new Country("IN", "India"));
		service.addCountry(new Country("US", "United States"));
		service.addCountry(new Country("JP", "Japan"));

		System.out.println("Countries in Database:");

		service.getAllCountries().forEach(System.out::println);
	}
}