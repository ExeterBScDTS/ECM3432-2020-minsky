package minskyone;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.Map;
import java.util.HashMap;

// Suggest fileName = "test.db"
public class Database {

    private Map<String,String> settings;

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
    public void createNewDatabase() throws SQLException {

        try (Connection conn = this.connect()) {
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();
                System.out.println("The driver name is " + meta.getDriverName());
                System.out.println("Database opened or created.");
            }
        }
    }

    public void createNewTable() throws SQLException {
        // SQLite connection string
   
        String sql_tables = "create table settings  (\n" 
                + "     name varchar(100) not null primary key,\n"
                + "     value varchar(100)\n" + " );";

        try (Connection conn = this.connect(); Statement stmt = conn.createStatement()) {
            // create table
            stmt.execute(sql_tables);
        }
    }

    public void insert(String name, String value) {
        String sql = "INSERT OR REPLACE INTO settings(name,value) VALUES(?,?)";

        try (Connection conn = this.connect(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, name);
            pstmt.setString(2, value);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void getSettings() throws SQLException {
        settings = new HashMap<String,String>();
        String query = "select NAME, VALUE " + "from SETTINGS";
        try (Connection conn = this.connect(); Statement stmt = conn.createStatement();) {
            try (ResultSet rs = stmt.executeQuery(query);) {
                // Iterate through the data
                while (rs.next()) {
                    settings.put(rs.getString(1),rs.getString(2));   
                }
            }
        }
        System.out.println(settings);
    }
}