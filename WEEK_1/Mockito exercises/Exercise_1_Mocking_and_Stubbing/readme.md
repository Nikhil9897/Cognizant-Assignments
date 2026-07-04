### Mockito Exercise 1 - Mocking and Stubbing

\# Mockito Exercise 1 - Mocking and Stubbing



\## Objective



Learn how to use Mockito to create mock objects and stub method behavior for unit testing.



\## Technologies Used



\- Java 17

\- Maven

\- JUnit 5

\- Mockito 5

\- IntelliJ IDEA



\## Project Structure



```

src

├── main

│   └── java

│       ├── ExternalApi.java

│       └── MyService.java

└── test

&#x20;   └── java

&#x20;       └── MyServiceTest.java

```



\## Description



This project demonstrates how to:

\- Create a mock object using Mockito.

\- Stub a method to return predefined data.

\- Inject the mock object into a service.

\- Verify the service returns the expected result using JUnit assertions.



\## Test Performed



\- Mock External API

\- Stub `getData()` method

\- Verify returned value



\## Expected Output



```

1 test passed

Process finished with exit code 0

```

