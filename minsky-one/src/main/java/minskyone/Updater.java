package minskyone;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
/*
 Resources 
 For Java 11
 https://openjdk.java.net/groups/net/httpclient/recipes.html

 For Java 8
*/

import java.io.InputStream;
import java.net.URI;
import java.util.List;


import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

public class Updater {

    /*

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/plain");
        PrintWriter out = resp.getWriter();
        
        try{
            URI location = this.getRedirect("https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/");
            String[] url = location.getPath().split("/");
            String versionID = url[url.length-1];
            out.println("Latest version is " + versionID);
            String warURL = "https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/download/" +
                versionID + "/minskyOne-0.2.war";
            out.println(warURL);
            this.downloadBinary(warURL, "minskyOne-0.2.war");
        }catch(Exception e){
            out.println(e);
        }
        out.println();
    }

    */
   
    /*
    This method is not used here, but is included to show that to resolve
    redirects and fetch the resulting page is pretty simple and doesn't
    require the contortions used in the other methods here.
    */
    public String getPage(String uri) throws Exception {
  
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(uri);
        CloseableHttpResponse response1 = httpclient.execute(httpGet);

        return response1.toString();
    }

/*


Step 1. Go here
https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/

Get a URL like this as the redirect endpoint. Like this
https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/tag/v0.1.1

Step 2. Create new URL. Like this
https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/download/v0.1.1/minskyOne-0.2.war

See https://hc.apache.org/httpcomponents-client-4.5.x/tutorial/html/fundamentals.html#d5e334

and http://www.java2s.com/Tutorial/Java/0320__Network/SavebinaryfilefromURL.htm

*/

    public static URI getRedirect(String uri) throws Exception {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpClientContext context = HttpClientContext.create();
        HttpGet httpget = new HttpGet(uri);
        CloseableHttpResponse response = httpclient.execute(httpget, context);
        HttpHost target = context.getTargetHost();
        List<URI> redirectLocations = context.getRedirectLocations();
        URI location = URIUtils.resolve(httpget.getURI(), target, redirectLocations);
        return location;
    }  
    

    public static void downloadBinary(String uri, String filename) throws Exception {
        FileOutputStream out = new FileOutputStream(filename);
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpGet httpget = new HttpGet(uri);
        CloseableHttpResponse response = httpclient.execute(httpget);
        try {
            HttpEntity entity = response.getEntity();
            long contentLength = entity.getContentLength();
            if (entity != null) {
                InputStream in = new BufferedInputStream(entity.getContent());
                
                byte[] data = new byte[(int)contentLength];
                int bytesRead = 0;
                int offset = 0;
                while (offset < contentLength) {
                    bytesRead = in.read(data, offset, data.length - offset);
                    if (bytesRead == -1)
                        break;
                    offset += bytesRead;
                }
                in.close();
                out.write(data);
                out.flush();
                out.close();
            }
        } finally {
            response.close();
        }
    }

}
