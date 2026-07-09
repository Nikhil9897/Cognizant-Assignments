### Create Authentication Service That Returns JWT



\## Objective



Develop a Spring Boot REST service that authenticates a user using Spring Security Basic Authentication and returns a JWT (JSON Web Token).



\---



\## Technologies Used



\- Java 17

\- Spring Boot

\- Spring Security

\- Spring Web

\- Maven

\- JJWT



\---



\## Dependencies



\- Spring Boot Starter Web

\- Spring Boot Starter Security

\- JJWT

\- JAXB (Java 17 compatibility)



\---



\## Project Structure



```

src

&#x20;└── main

&#x20;    ├── java

&#x20;    │   └── com.cognizant.springlearn

&#x20;    │        ├── controller

&#x20;    │        │      └── AuthenticationController.java

&#x20;    │        ├── security

&#x20;    │        │      └── SecurityConfig.java

&#x20;    │        └── CreateAuthenticationServiceThatReturnsJwtApplication.java

&#x20;    │

&#x20;    └── resources

&#x20;         └── application.properties

```



\---



\## Endpoint



\### Authenticate User



```

GET /authenticate

```



\---



\## Authentication



Use HTTP Basic Authentication.



Username



```

user

```



Password



```

pwd

```



\---



\## URL



```

http://localhost:8080/authenticate

```



\---



\## Sample Response



```json

{

&#x20; "token":"eyJhbGciOiJIUzI1NiJ9........"

}

```



\---



\## Steps Performed



1\. Created a Spring Boot Maven project.

2\. Added Spring Web and Spring Security dependencies.

3\. Added JWT library.

4\. Configured Spring Security with in-memory users.

5\. Created AuthenticationController.

6\. Read the Authorization header.

7\. Decoded username and password.

8\. Generated JWT token.

9\. Returned JWT token as JSON response.



\---



\## Output Screenshot



![Output](Output.png)







