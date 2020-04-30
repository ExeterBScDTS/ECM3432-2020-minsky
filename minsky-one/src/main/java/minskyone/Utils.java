package minskyone;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.json.*;

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
    
    // See https://docs.oracle.com/javaee/7/api/javax/json/JsonObject.html
    // and https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html
    //
    // Example of use -
    //
    // Map<String,String> dict = new HashMap<String,String>();
    // dict.put("latest",versionID);
    // String jsontext = Utils.jsonNameValue(dict);
    // out.print(jsontext);

    public static String jsonNameValue(Map<String,String> dict){

        JsonObjectBuilder builder = Json.createObjectBuilder();
        
        // use lambda function
        dict.forEach((k,v) -> builder.add(k, v));    
        JsonObject value = builder.build();
        return(value.toString());
    }

    public static Map<String,String> jsonMap(String encoded){

        Map<String,String> map = new HashMap<String,String>();

        System.out.println("Utils.jsonMap: decoding-" + encoded);
        JsonReader rdr = Json.createReader(new StringReader(encoded));
        JsonStructure object = rdr.read();
        rdr.close();
        
        // For better example 
        // see https://stackoverflow.com/questions/29235117/from-json-string-to-java-object-using-javax-json
        for (Entry<String, JsonValue> entry : ((JsonObject)object).entrySet()) {
            try{
            map.put(entry.getKey(), ((JsonNumber)(entry.getValue())).toString());
            }catch(ClassCastException e){
                e.printStackTrace();
                map.put(entry.getKey(), ((JsonString)(entry.getValue())).toString());
            }
        }
        return map;
    }


}