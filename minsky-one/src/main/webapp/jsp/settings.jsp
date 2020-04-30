<%@page import="minskyone.*,java.util.*,java.net.URI" language="java" contentType="application/json" %>
<%
  Map<String,String> dict = new HashMap<String,String>();

  Map<String,String[]> params = request.getParameterMap();

  dict.put("tir.min", "10");
  dict.put("tir.max", "30");
  String jsontext = Utils.jsonNameValue(dict);
  out.print(jsontext);
%>