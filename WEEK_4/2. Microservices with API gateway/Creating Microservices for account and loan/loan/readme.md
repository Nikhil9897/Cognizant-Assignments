# Creating Microservices for Account and Loan

## Loan Microservice

### Objective

Develop a Spring Boot REST microservice that provides loan details based on the loan number.

---

## Technologies Used

- Java 17
- Spring Boot
- Spring Web
- Maven

---

## Dependencies

- Spring Boot Starter Web
- Spring Boot DevTools

---

## Project Structure

```
loan
│── src
│   ├── main
│   │   ├── java
│   │   │   └── loan
│   │   │       ├── LoanApplication.java
│   │   │       └── controller
│   │   │           └── LoanController.java
│   │   └── resources
│   │       └── application.properties
│   └── test
│
├── pom.xml
├── README.md
└── Screenshots
```

---

## REST Endpoint

### Get Loan Details

**Request**

```
GET /loans/{number}
```

**Example**

```
http://localhost:8081/loans/H00987987972342
```

---

## Sample Response

```json
{
  "number": "H00987987972342",
  "type": "Car",
  "loan": 400000,
  "emi": 3258,
  "tenure": 18
}
```

---

## Steps Performed

1. Created a Spring Boot Maven project.
2. Added Spring Web dependency.
3. Created the `LoanController` class.
4. Implemented REST endpoint using `@GetMapping`.
5. Configured server port to **8081**.
6. Returned dummy loan information.
7. Tested the endpoint successfully in the browser.

---

# Output Screenshots

## Project Structure

![Project Structure](project-structure.png)

---

## LoanController

![Loan Controller](controller.png)

---

## Application Running

![Console Output](console.png)

---

## Browser Output

![Browser Output](browser-output.png)
