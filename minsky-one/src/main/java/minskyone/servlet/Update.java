package minskyone.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import minskyone.Updater;

public class Update extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/plain");
        PrintWriter out = resp.getWriter();
        
        try{
            String requestedVersionID = req.getParameter("download");
            URI location = Updater.getRedirect("https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/");
            String[] url = location.getPath().split("/");
            String versionID = url[url.length-1];
            out.println("Requested version " + requestedVersionID + " Latest version " + versionID);
            String warURL = "https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/download/" +
                versionID + "/minskyOne-0.2.war";
            out.println(warURL);
            // Updater.downloadBinary(warURL, "minskyOne-0.2.war");
        }catch(Exception e){
            out.println(e);
        }
        out.println();
    }
}
