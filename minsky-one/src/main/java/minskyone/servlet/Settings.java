package minskyone.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.sql.SQLException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class Settings extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private minskyone.Database db;

    @Override
    public void init(ServletConfig config) throws ServletException { 
        // Always call super.init(config) first (servlet mantra #1) 
        super.init(config);
        db = new minskyone.Database();
        try{
            db.createNewDatabase();
            db.createNewTable();
        } catch(SQLException e){
            // Table already exists
            //e.printStackTrace();
        }   
        try{
            db.getSettings();
        } catch(SQLException e){
            //e.printStackTrace();
        }      

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();

        String encData = req.getReader().lines().collect(Collectors.joining());

        System.out.println("Settings: " + encData);

        Map<String,String> dict = minskyone.Utils.jsonMap(encData);

        dict.forEach((k,v) -> db.insert(k, v));

        out.print(minskyone.Utils.jsonNameValue(dict));
    }
}
