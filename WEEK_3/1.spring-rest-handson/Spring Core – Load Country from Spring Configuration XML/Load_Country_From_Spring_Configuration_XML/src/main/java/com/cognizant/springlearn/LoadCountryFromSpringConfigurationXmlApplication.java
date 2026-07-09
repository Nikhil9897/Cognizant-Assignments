package com.cognizant.springlearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class LoadCountryFromSpringConfigurationXmlApplication {

    public static void main(String[] args) {

        SpringApplication.run(LoadCountryFromSpringConfigurationXmlApplication.class, args);

        displayCountry();
    }

    public static void displayCountry() {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        Country country = (Country) context.getBean("country");

        System.out.println(country);
    }
}