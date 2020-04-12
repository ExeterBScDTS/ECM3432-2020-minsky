package minskyone.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;

// import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import minskyone.Updater;
import minskyone.DownloadCallback;

// For tips on Async IO see https://webtide.com/servlet-3-1-async-io-and-jetty/


public class Update extends HttpServlet implements DownloadCallback{

    private static final long serialVersionUID = 1L;
    PrintWriter out;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //resp.setContentType("text/plain");

        // content type must be set to text/event-stream
        resp.setContentType("text/event-stream");
        // encoding must be set to UTF-8
        resp.setCharacterEncoding("UTF-8");

        this.out = resp.getWriter();

        // AsyncContext async = req.startAsync();
        
        try{
            String requestedVersionID = req.getParameter("download");
            URI location = Updater.getRedirect("https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/");
            String[] url = location.getPath().split("/");
            String versionID = url[url.length-1];
            //out.println("Requested version " + requestedVersionID + " Latest version " + versionID);
            String warURL = "https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/download/" +
                versionID + "/minskyOne-0.2.war";
            //out.println(warURL);
            Updater.downloadBinary(warURL, "minskyOne-0.2.war", this);
        }catch(Exception e){
            //out.println(e);
        }
        //out.println();
    }

    public void progress(int percent){
        this.out.write("data: " + percent + "\n\n");
        this.out.flush();
    };
}
