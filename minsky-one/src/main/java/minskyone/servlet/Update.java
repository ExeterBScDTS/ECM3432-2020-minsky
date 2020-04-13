package minskyone.servlet;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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
    PrintWriter out = null;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // content type must be set to text/event-stream
        resp.setContentType("text/event-stream");
        // encoding must be set to UTF-8
        resp.setCharacterEncoding("UTF-8");

        this.out = resp.getWriter();

        String doUpdate = req.getParameter("update");

        if (doUpdate != null) {
            this.out.write("data: UPDATE\n\n");
            // open the zip file stream
            String versionID = doUpdate;
            try (InputStream theFile = new FileInputStream("minskyOne-" + versionID + ".zip");
                    ZipInputStream stream = new ZipInputStream(theFile);) {
                ZipEntry entry;
                byte[] buffer = new byte[2048];
                while ((entry = stream.getNextEntry()) != null) {
                    this.out.write("data: EXTRACTING " + entry.getName() + "\n\n");
                    try (OutputStream output = new FileOutputStream(entry.getName());) {
                        int len = 0;
                        while ((len = stream.read(buffer)) > 0) {
                            output.write(buffer, 0, len);
                        }
                        this.out.write("data: SAVED " + entry.getName() + "\n\n");

                        Path sourcePath = Paths.get(entry.getName());
                        Path destinationPath = Paths.get("webapps/" + entry.getName());

                        try {
                            Files.move(sourcePath, destinationPath, StandardCopyOption.REPLACE_EXISTING);
                            this.out.write("data: INSTALLED " + entry.getName() + "\n\n");
                        } catch (IOException e) {
                            // moving file failed.
                            e.printStackTrace();
                        }
                    }
                }
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
                e.printStackTrace();
            }
        }
        this.out.write("data: DONE\n\n");
        this.out.close();
    }

    public void progress(int percent) {
        this.out.write("data: " + percent + "\n\n");
        this.out.flush();
    }
}
