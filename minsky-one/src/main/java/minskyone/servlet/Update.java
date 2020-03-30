package minskyone.servlet;

import static org.mockito.Mockito.doReturn;

/*
 Resources 
 For Java 11
 https://openjdk.java.net/groups/net/httpclient/recipes.html

 For Java 8
*/
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpHost;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

public class Update extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/plain");
        PrintWriter out = resp.getWriter();
        
        try{
        URI location = this.get("https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/");
        //String url = location.toASCIIString();
        String[] url = location.getPath().split("/");
        out.println(url[url.length-1]);
        }catch(Exception e){
            out.println(e);
        }
        out.print("Update available"); 
        out.println();
    }


/*
public String get(String uri) throws Exception {
  
    
    CloseableHttpClient httpclient = HttpClients.createDefault();
    HttpGet httpGet = new HttpGet(uri);
    CloseableHttpResponse response1 = httpclient.execute(httpGet);

    return response1.toString();
}
*/

// See https://hc.apache.org/httpcomponents-client-4.5.x/tutorial/html/fundamentals.html#d5e334

/*

Step 1. Go here
https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/

Get a URL like this as the redirect endpoint. Like this
https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/tag/v0.1.1

Step 2. Create new URL. Like this
https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/download/v0.1.1/minskyOne-0.2.war

*/

    public URI get(String uri) throws Exception {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpClientContext context = HttpClientContext.create();
        HttpGet httpget = new HttpGet(uri);
        CloseableHttpResponse response = httpclient.execute(httpget, context);
        HttpHost target = context.getTargetHost();
        List<URI> redirectLocations = context.getRedirectLocations();
        URI location = URIUtils.resolve(httpget.getURI(), target, redirectLocations);
        return location;
        //return location.toASCIIString();
    }   

}
