USE bank_db;

DROP PROCEDURE IF EXISTS UpdateEmployeeBonus;

DELIMITER //

CREATE PROCEDURE UpdateEmployeeBonus(
    IN p_department VARCHAR(50),
    IN p_percent DECIMAL(5,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Salary update failed.' AS Message;
    END;

    START TRANSACTION;

    UPDATE Employees
    SET Salary = Salary + (Salary * p_percent / 100)
    WHERE Department = p_department;

    COMMIT;

    SELECT 'Salary updated.' AS Message;
END //

DELIMITER ;

CALL UpdateEmployeeBonus('IT', 10.00);