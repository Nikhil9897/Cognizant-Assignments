USE bank_db;

DROP PROCEDURE IF EXISTS RunScenario3;

-- Create temporary table to gather reminder messages inside loop
CREATE TEMPORARY TABLE IF NOT EXISTS TempReminders (
    ReminderMessage VARCHAR(255)
);
TRUNCATE TABLE TempReminders;

DELIMITER //

CREATE PROCEDURE RunScenario3()
BEGIN
    DECLARE v_done INT DEFAULT FALSE;
    DECLARE v_name VARCHAR(100);
    DECLARE v_loan_id INT;
    DECLARE v_end_date DATE;
    
   
    DECLARE cur CURSOR FOR 
        SELECT c.Name, l.LoanID, l.EndDate
        FROM Customers c
        JOIN Loans l ON c.CustomerID = l.CustomerID
        WHERE l.EndDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY);
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_name, v_loan_id, v_end_date;
        IF v_done THEN
            LEAVE read_loop;
        END IF;
        
        
        INSERT INTO TempReminders (ReminderMessage)
        VALUES (CONCAT('Reminder: ', v_name, ', Loan ID ', v_loan_id, ' is due on ', DATE_FORMAT(v_end_date, '%d-%b-%Y')));
    END LOOP;
    
    CLOSE cur;
END //

DELIMITER ;


CALL RunScenario3();


DROP PROCEDURE IF EXISTS RunScenario3;


SELECT ReminderMessage FROM TempReminders;


DROP TEMPORARY TABLE IF EXISTS TempReminders;