package minskyone.servlet;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URI;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import minskyone.Updater;
import minskyone.DownloadCallback;

public class Update extends HttpServlet implements DownloadCallback {

    private static final long serialVersionUID = 1L;
    PrintWriter out;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // content type must be set to text/event-stream
        resp.setContentType("text/event-stream");
        // encoding must be set to UTF-8
        resp.setCharacterEncoding("UTF-8");

        this.out = resp.getWriter();

        String doUpdate = req.getParameter("update");

        if (doUpdate != null) {

            try {
                // create a buffer to improve copy performance later.
                byte[] buffer = new byte[2048];

                // open the zip file stream
                String versionID = doUpdate;
                InputStream theFile = new FileInputStream("minskyOne-" + versionID + ".zip");
                ZipInputStream stream = new ZipInputStream(theFile);
                this.out.write("data: UPDATE\n\n");
                ZipEntry entry;
                while((entry = stream.getNextEntry())!=null)
                {
                        String s = String.format("Entry: %s len %d",
                            entry.getName(), entry.getSize());
                        System.err.println(s);
                        this.out.write("data: " + entry.getName() + "\n\n");
                }

            } catch (Exception e) {
                System.err.println(e);
            }
        } else {
            try {
                String requestedVersionID = req.getParameter("download");
                URI location = Updater
                        .getRedirect("https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/");
                String[] url = location.getPath().split("/");
                String versionID = url[url.length - 1];
                // String warURL =
                // "https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/download/" +
                // versionID + "/minskyOne-0.2.war";
                String zipURL = "https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/download/" + versionID
                        + "/minskyOne-" + versionID + ".zip";
                Updater.downloadBinary(zipURL, "minskyOne-" + versionID + ".zip", this);
            } catch (Exception e) {
                System.err.println(e);
            }
        }
        this.out.write("data: DONE\n\n");
        this.out.close();
    }

    public void progress(int percent) {
        this.out.write("data: " + percent + "\n\n");
        this.out.flush();
    };
}
