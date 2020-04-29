package minskyone.servlet;



import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*

Be sure to include a load-on-startup for this servlet. Like this -

 <servlet>
     <servlet-name>dbstatus</servlet-name>
     <servlet-class>minskyone.servlet.DBStatus</servlet-class>
     <load-on-startup>1</load-on-startup>
  </servlet>

 */ 

public class DBStatus extends HttpServlet {
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
            e.printStackTrace();
        }   
        try{
            db.getSettings();
        } catch(SQLException e){
            e.printStackTrace();
        }      

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        resp.setContentType("text/plain");
        PrintWriter out = resp.getWriter();

        ServletContext cntx= req.getServletContext();
        String realPath; 
        realPath = cntx.getRealPath(".");
        out.printf("RealPath for . =%s%n", realPath);
        realPath = cntx.getRealPath("/");
        out.printf("RealPath for / =%s%n", realPath);

        realPath = java.nio.file.Paths.get(".").toAbsolutePath().toString();
        out.printf("file.Paths.get for . =%s%n", realPath);
        realPath = java.nio.file.Paths.get("/").toAbsolutePath().toString();
        out.printf("file.Paths.get for / =%s%n", realPath);

        //db.insert("cat", "Willow");
        try{
            db.getSettings();
        } catch(SQLException e){
            e.printStackTrace();
        } 
    }

}
