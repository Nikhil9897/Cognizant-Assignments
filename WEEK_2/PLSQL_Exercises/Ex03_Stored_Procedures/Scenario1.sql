USE bank_db;

DROP PROCEDURE IF EXISTS ProcessMonthlyInterest;

DELIMITER //

CREATE PROCEDURE ProcessMonthlyInterest()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Monthly interest processing failed.' AS Message;
    END;

    START TRANSACTION;

    UPDATE Accounts
    SET Balance = Balance * 1.01
    WHERE AccountType = 'Savings';

    COMMIT;

    SELECT 'Monthly interest processed successfully for all savings accounts.' AS Message;
END //

DELIMITER ;

CALL ProcessMonthlyInterest();