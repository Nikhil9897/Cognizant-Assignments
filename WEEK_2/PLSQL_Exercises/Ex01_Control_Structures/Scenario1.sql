USE bank_db;

DROP PROCEDURE IF EXISTS RunScenario1;

DELIMITER //

CREATE PROCEDURE RunScenario1()
BEGIN

    DECLARE v_done INT DEFAULT FALSE;
    DECLARE v_loan_id INT;
    DECLARE v_interest_rate DECIMAL(5,2);
    

    DECLARE cur CURSOR FOR 
        SELECT l.LoanID, l.InterestRate
        FROM Loans l
        JOIN Customers c ON l.CustomerID = c.CustomerID
        WHERE TIMESTAMPDIFF(YEAR, c.DOB, CURDATE()) > 60;
        
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;
    
    START TRANSACTION;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_loan_id, v_interest_rate;
        IF v_done THEN
            LEAVE read_loop;
        END IF;
        
        
        UPDATE Loans
        SET InterestRate = v_interest_rate - 1
        WHERE LoanID = v_loan_id;
    END LOOP;
    
    CLOSE cur;
    
    COMMIT;
    
    SELECT 'Interest rates updated successfully.' AS Message;
END //

DELIMITER ;


CALL RunScenario1();


DROP PROCEDURE IF EXISTS RunScenario1;