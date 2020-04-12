package minskyone.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import minskyone.Updater;
import minskyone.DownloadCallback;

public class Update extends HttpServlet implements DownloadCallback{

    private static final long serialVersionUID = 1L;
    PrintWriter out;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // content type must be set to text/event-stream
        resp.setContentType("text/event-stream");
        // encoding must be set to UTF-8
        resp.setCharacterEncoding("UTF-8");

        this.out = resp.getWriter();
        
        try{
            String requestedVersionID = req.getParameter("download");
            URI location = Updater.getRedirect("https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/");
            String[] url = location.getPath().split("/");
            String versionID = url[url.length-1];
            //out.println("Requested version " + requestedVersionID + " Latest version " + versionID);
            String warURL = "https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/download/" +
                versionID + "/minskyOne-0.2.war";
            Updater.downloadBinary(warURL, "minskyOne-0.2.war", this);
        }catch(Exception e){
            //
        }
        this.out.write("data: DONE\n\n");
        this.out.close();
    }

    public void progress(int percent){
        this.out.write("data: " + percent + "\n\n");
        this.out.flush();
    };
}
