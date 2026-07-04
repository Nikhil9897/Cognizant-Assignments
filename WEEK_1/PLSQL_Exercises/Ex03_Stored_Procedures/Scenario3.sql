USE bank_db;

DROP PROCEDURE IF EXISTS TransferFunds;

DELIMITER //

CREATE PROCEDURE TransferFunds(
    IN p_from_account INT,
    IN p_to_account INT,
    IN p_amount DECIMAL(15,2)
)
BEGIN
    DECLARE v_balance DECIMAL(15,2);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Transaction failed. Rolled back.' AS Message;
    END;

    START TRANSACTION;

    SELECT Balance INTO v_balance FROM Accounts WHERE AccountID = p_from_account;
    
    IF v_balance IS NULL THEN
        ROLLBACK;
        SELECT 'Error: Source account does not exist.' AS Message;
    ELSEIF v_balance < p_amount THEN
        ROLLBACK;
        SELECT 'Error: Insufficient balance.' AS Message;
    ELSE
        UPDATE Accounts
        SET Balance = Balance - p_amount
        WHERE AccountID = p_from_account;

        UPDATE Accounts
        SET Balance = Balance + p_amount
        WHERE AccountID = p_to_account;

        COMMIT;
        SELECT 'Fund transfer completed successfully.' AS Message;
    END IF;
END //

DELIMITER ;

CALL TransferFunds(101, 102, 1000.00);