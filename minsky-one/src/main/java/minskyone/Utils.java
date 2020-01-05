package minskyone;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

public class Utils {

    public static String getParameter(final HttpServletRequest req, final String name) {

        final ServletContext sc = req.getServletContext();
        String v = sc.getInitParameter(name);
        if (v == null) {
            v = sc.getInitParameter(name + ".default");
        }
        return v;
    }

    // As getParameter but the value is a path. For .default parameters the
    // path is always relative to the web home directory, i.e. webapp, but
    // as the true file system path, e.g. /home/pi/jetty-base/minsky-base/webapp/...
    // For user defined parameters the same applies unless the first char is /
    // in which case it is an absolute path for the host file system, e.g.
    // /etc/passwd
    public static String getPath(final HttpServletRequest req, final String name) {

        final ServletContext sc = req.getServletContext();
        String p = null;
        String v = sc.getInitParameter( name );
        if( v != null){
            // If first character is '/' then it's an absolute path.
            if(v.charAt(0) == '/'){
                p = java.nio.file.Paths.get(v).toAbsolutePath().toString();
            }else{
                p = sc.getRealPath(v);
            }
        }else{
            v = sc.getInitParameter( name + ".default" );
            if(v != null){
                p = sc.getRealPath(v);
            }
        }
        return p;
    }  
}