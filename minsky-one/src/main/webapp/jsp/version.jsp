<%@page import="minskyone.*,java.util.*,java.net.URI" language="java" contentType="application/json" %>
<%
  URI location = Updater.getRedirect("https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/");
  String[] url = location.getPath().split("/");
  String versionID = url[url.length-1];
  Map<String,String> dict = new HashMap<String,String>();
  dict.put("latest",versionID);
  String jsontext = Utils.jsonNameValue(dict);
  out.print(jsontext);
%>