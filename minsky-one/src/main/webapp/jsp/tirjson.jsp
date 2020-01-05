<%@page import="minskyone.*,javax.json.*,java.util.Arrays" language="java" contentType="application/json" %><%
  String fltpath = Utils.getPath(request, "minsky.camera.tir.fltpath"); 
  String[] tir = TemperatureData.getData(fltpath);
  out.print(Arrays.toString(tir));
%>
