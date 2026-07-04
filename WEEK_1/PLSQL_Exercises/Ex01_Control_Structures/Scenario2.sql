USE bank_db;

DROP PROCEDURE IF EXISTS RunScenario2;

DELIMITER //

CREATE PROCEDURE RunScenario2()
BEGIN
    DECLARE v_done INT DEFAULT FALSE;
    DECLARE v_customer_id INT;
    DECLARE v_balance DECIMAL(15,2);
    
    
    DECLARE cur CURSOR FOR 
        SELECT CustomerID, Balance 
        FROM Customers;
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;
    
    START TRANSACTION;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_customer_id, v_balance;
        IF v_done THEN
            LEAVE read_loop;
        END IF;
        
        
        IF v_balance > 10000 THEN
            UPDATE Customers
            SET IsVIP = 'TRUE'
            WHERE CustomerID = v_customer_id;
        END IF;
    END LOOP;
    
    CLOSE cur;
    
    COMMIT;
    
    SELECT 'VIP status updated successfully.' AS Message;
END //

DELIMITER ;


CALL RunScenario2();

DROP PROCEDURE IF EXISTS RunScenario2;