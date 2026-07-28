import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class PLSQLRunner {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.err.println("Usage: java PLSQLRunner <sql-file-path>");
            System.exit(1);
        }
        
        String sqlFilePath = args[0];
        
        String user = System.getenv("MYSQL_USER");
        if (user == null) user = "root";
        
        String password = System.getenv("MYSQL_PASSWORD");
        if (password == null) password = "";
        
        String url = System.getenv("MYSQL_URL"); 
        if (url == null) url = "jdbc:mysql://localhost:3307/?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC";
        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL JDBC Driver not found. Please ensure mysql-connector-j-*.jar is in the classpath.");
            e.printStackTrace();
            System.exit(1);
        }
        
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            String fileName = Paths.get(sqlFilePath).getFileName().toString();
            System.out.println("Executing: " + fileName);
            
            String content = new String(Files.readAllBytes(Paths.get(sqlFilePath)));
            
            // Custom parser to split commands by current delimiter
            List<String> queries = parseSQLScript(content);
            
            try (Statement stmt = conn.createStatement()) {
                for (String query : queries) {
                    query = query.trim();
                    if (query.isEmpty()) continue;
                    
                    boolean hasResultSet = stmt.execute(query);
                    int updateCount = stmt.getUpdateCount();
                    System.out.println("Statement executed successfully. Update count: " + updateCount);
                    
                    if (hasResultSet) {
                        try (ResultSet rs = stmt.getResultSet()) {
                            printResultSet(rs);
                        }
                    }
                }
            }
            
        } catch (SQLException | IOException e) {
            System.err.println("Execution failed: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }
    
    private static List<String> parseSQLScript(String content) {
        List<String> queries = new ArrayList<>();
        String[] lines = content.split("\\r?\\n");
        StringBuilder currentQuery = new StringBuilder();
        String currentDelimiter = ";";
        
        for (String line : lines) {
            String trimmedLine = line.trim();
            
            // Check for DELIMITER change
            if (trimmedLine.toUpperCase().startsWith("DELIMITER")) {
                // Save any pending query
                String pending = currentQuery.toString().trim();
                if (!pending.isEmpty()) {
                    queries.add(pending);
                    currentQuery.setLength(0);
                }
                // Extract new delimiter
                String[] parts = trimmedLine.split("\\s+");
                if (parts.length > 1) {
                    currentDelimiter = parts[1];
                }
                continue;
            }
            
            // Skip comments
            if (trimmedLine.startsWith("--")) {
                continue;
            }
            
            // Skip SQL*Plus commands (like SET SERVEROUTPUT ON)
            if (trimmedLine.toUpperCase().startsWith("SET SERVEROUTPUT")) {
                continue;
            }
            
            currentQuery.append(line).append("\n");
            
            // Check if the current query ends with the active delimiter
            String queryStr = currentQuery.toString().trim();
            if (queryStr.endsWith(currentDelimiter)) {
                // Strip the delimiter from the query end
                queryStr = queryStr.substring(0, queryStr.length() - currentDelimiter.length()).trim();
                queries.add(queryStr);
                currentQuery.setLength(0);
            }
        }
        
        String remaining = currentQuery.toString().trim();
        if (!remaining.isEmpty()) {
            queries.add(remaining);
        }
        
        return queries;
    }
    
    private static void printResultSet(ResultSet rs) throws SQLException {
        ResultSetMetaData meta = rs.getMetaData();
        int cols = meta.getColumnCount();
        
        // Print header
        for (int i = 1; i <= cols; i++) {
            System.out.print(meta.getColumnLabel(i) + "\t");
        }
        System.out.println();
        System.out.println("========================================");
        
        int rows = 0;
        while (rs.next()) {
            rows++;
            for (int i = 1; i <= cols; i++) {
                System.out.print(rs.getString(i) + "\t");
            }
            System.out.println();
        }
        System.out.println("(" + rows + " rows returned)");
    }
}
