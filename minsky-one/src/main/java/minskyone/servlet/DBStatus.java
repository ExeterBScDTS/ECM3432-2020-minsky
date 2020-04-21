package minskyone.servlet;

import javax.servlet.http.HttpServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Enumeration;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DBStatus extends HttpServlet {
    private static final long serialVersionUID = 1L;

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
        context(out, req);

        minskyone.Database db = new minskyone.Database();
        try{
            db.createNewDatabase();
            minskyone.Database.createNewTable("test.db");
        } catch(SQLException e){
            e.printStackTrace();
        }
        db.insert("cat", "Willow");
        try{
            db.getSettings();
        } catch(SQLException e){
            e.printStackTrace();
        }   

        // info(out,req.getPathInfo());
        //String urlPath[]= req.getPathInfo().split("/");
        //out.printf("req.getPathInfo() =%s%n", urlPath[1]);
    }

    private void context(PrintWriter out, HttpServletRequest req)
    {
        ServletContext sc = req.getServletContext();
        Enumeration<String> a = sc.getInitParameterNames();
        while(a.hasMoreElements()){
            String n = a.nextElement();
            String v = sc.getInitParameter(n);
            out.printf("{%s} = %s%n",n,v);
        }
    }
}
