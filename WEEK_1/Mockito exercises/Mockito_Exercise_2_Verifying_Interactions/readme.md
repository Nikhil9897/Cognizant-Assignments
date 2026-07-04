### Mockito Exercise 2 - Verifying Interactions



\# Mockito Exercise 2 - Verifying Interactions



\## Objective



Learn how to verify method interactions using Mockito.



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

\- Inject the mock object into a service class.

\- Invoke a service method.

\- Verify that the expected method on the mock object was called using `verify()`.



\## Test Performed



\- Verify interaction with mocked `ExternalApi`

\- Ensure `getData()` is invoked when `fetchData()` is executed



\## Expected Output



```

1 test passed

Process finished with exit code 0

```

