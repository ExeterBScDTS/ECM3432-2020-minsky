package minskyone;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;


// Suggest fileName = "test.db"
public class Database {

    private Connection connect() {
        // SQLite connection string
        String fileName = "test.db";
        String url = "jdbc:sqlite:./" + fileName;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

    /**
     * Connect to a sample database
     *
     * @param fileName the database file name
     */
    public void createNewDatabase() throws SQLException{
 
        try (Connection conn = this.connect()) {
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();
                System.out.println("The driver name is " + meta.getDriverName());
                System.out.println("Database opened or created.");
            }
        }
    }
 

    public static void createNewTable(String fileName) {
        // SQLite connection string
        String url = "jdbc:sqlite:./" + fileName;
        
        // SQL statement for creating a new table.
        // Tables spec from sample jdbcReal.properties included with Jetty.
 
        String sql_tables = "create table settings  (\n"
                + "     name varchar(100) not null primary key,\n"
                + "     value varchar(100)\n"
                + " );";
        
                /*
        String sql_test_data = "insert into users values (1, 'admin', 'password');"
                + "insert into roles values (1, 'server-administrator');"
                + "insert into roles values (2, 'content-administrator');"
                + "insert into user_roles values (1, 1);"
                + "insert into user_roles values (1, 2);";
*/

        try (Connection conn = DriverManager.getConnection(url);
                Statement stmt = conn.createStatement()) {
            // create a new table
            stmt.execute(sql_tables);
            //stmt.execute(sql_test_data);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    } 
    
    public void insert(String name, String value) {
        String sql = "INSERT INTO settings(name,value) VALUES(?,?)";

        try (Connection conn = this.connect();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, name);
            pstmt.setString(2, value);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();;
        }
    }
}