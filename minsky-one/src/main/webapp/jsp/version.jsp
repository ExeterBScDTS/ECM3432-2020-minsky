<%@page import="minskyone.*,java.net.URI" language="java" contentType="application/json" %>
<%
  URI location = Updater.getRedirect("https://github.com/ExeterBScDTS/ECM3432-2020-minsky/releases/latest/");
  String[] url = location.getPath().split("/");
  String versionID = url[url.length-1];
  String jsontext = Utils.jsonNameValue(new String[]{"latest"},new String[]{versionID});
  out.print(jsontext);
%>