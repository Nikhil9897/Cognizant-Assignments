import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class AAATest {

    private MathOperations math;

    @Before
    public void setUp() {
        math = new MathOperations();
    }

    @After
    public void tearDown() {
        math = null;
    }

    @Test
    public void testAddition() {

        // Arrange
        int a = 10;
        int b = 20;

        // Act
        int result = math.add(a, b);

        // Assert
        assertEquals(30, result);

    }

    @Test
    public void testMultiplication() {

        // Arrange
        int a = 5;
        int b = 4;

        // Act
        int result = math.multiply(a, b);

        // Assert
        assertEquals(20, result);

    }
}