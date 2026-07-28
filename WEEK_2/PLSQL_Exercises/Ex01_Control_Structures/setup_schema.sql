
CREATE DATABASE IF NOT EXISTS bank_db;
USE bank_db;


DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Loans;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;


CREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    DOB DATE,
    Balance DECIMAL(15,2) DEFAULT 0.00,
    IsVIP VARCHAR(5) DEFAULT 'FALSE',
    LastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE Accounts (
    AccountID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT,
    AccountType VARCHAR(20),
    Balance DECIMAL(15,2) DEFAULT 0.00,
    LastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID) ON DELETE CASCADE
) AUTO_INCREMENT = 101;


CREATE TABLE Transactions (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    AccountID INT,
    TransactionDate DATE,
    Amount DECIMAL(15,2),
    TransactionType VARCHAR(10),
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID) ON DELETE CASCADE
);


CREATE TABLE Loans (
    LoanID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT,
    InterestRate DECIMAL(5,2),
    EndDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID) ON DELETE CASCADE
);


CREATE TABLE Employees (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Position VARCHAR(50),
    Salary DECIMAL(15,2),
    Department VARCHAR(50),
    HireDate DATE
);


INSERT INTO Customers (CustomerID, Name, DOB, Balance, IsVIP) VALUES
(1, 'Alice', '1960-01-15', 12000.00, 'FALSE'),
(2, 'Bob', '1955-06-20', 8000.00, 'FALSE'),
(3, 'Charlie', '1962-10-10', 15000.00, 'FALSE');

INSERT INTO Accounts (AccountID, CustomerID, AccountType, Balance) VALUES
(101, 1, 'Savings', 5000.00),
(102, 2, 'Savings', 3000.00);

INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType) VALUES
(1, 101, CURDATE(), 200.00, 'Deposit'),
(2, 102, CURDATE(), 300.00, 'Withdrawal');

INSERT INTO Loans (LoanID, CustomerID, InterestRate, EndDate) VALUES
(1, 1, 5.5, DATE_ADD(CURDATE(), INTERVAL 45 DAY)),
(2, 2, 4.9, DATE_ADD(CURDATE(), INTERVAL 10 DAY)),
(3, 3, 6.2, DATE_ADD(CURDATE(), INTERVAL 25 DAY));

INSERT INTO Employees (EmployeeID, Name, Position, Salary, Department, HireDate) VALUES
(1, 'Emma', 'Manager', 70000.00, 'HR', '2015-06-15'),
(2, 'Frank', 'Developer', 60000.00, 'IT', '2017-03-20');
