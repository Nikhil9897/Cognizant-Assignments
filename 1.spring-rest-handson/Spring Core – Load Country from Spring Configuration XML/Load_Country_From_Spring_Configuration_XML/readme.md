### Load Country from Spring Configuration XML



\## Objective



Load a Country bean using Spring XML configuration and display its details.



\## Technologies Used



\- Java 17

\- Spring Boot

\- Spring Framework

\- Maven



\## Project Structure



```

src

&#x20;├── main

&#x20;│   ├── java

&#x20;│   │      └── com.cognizant.springlearn

&#x20;│   │             ├── Country.java

&#x20;│   │             └── LoadCountryFromSpringConfigurationXmlApplication.java

&#x20;│   └── resources

&#x20;│          ├── application.properties

&#x20;│          └── country.xml

&#x20;└── test

```



\## Files



\### Country.java

Represents the Country bean with two properties:

\- code

\- name



\### country.xml

Defines the Country bean using Spring XML configuration.



\### LoadCountryFromSpringConfigurationXmlApplication.java

Loads the Spring XML configuration, retrieves the Country bean, and prints it.



\## Output



![Output](Output1.png)

