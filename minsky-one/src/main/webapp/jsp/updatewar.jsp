<%@page import="minskyone.*,javax.json.*,java.net.URI" language="java" contentType="application/json" %>
<%
  URI location = Updater.getRedirect("https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/");
  String[] url = location.getPath().split("/");
  String versionID = url[url.length-1];
  out.print("{\"latest\":\"" + versionID + "\"}");
%>