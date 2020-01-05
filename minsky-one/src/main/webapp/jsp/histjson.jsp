<%@page import="minskyone.*,javax.json.*,java.util.Arrays" language="java" contentType="application/json" %>
<%
  String fltpath = Utils.getPath(request, "minsky.camera.tir.fltpath"); 
  int num_bins = 50;
  String bins = request.getParameter("bins");
  if(bins != null){
    num_bins = Integer.parseInt(bins);
  }
  int bar_height = 460;
  String height = request.getParameter("height");
  if(height != null){
    bar_height = Integer.parseInt(height);
  }
  int[] hist = HistogramData.getData(fltpath, num_bins, bar_height);
  out.print(Arrays.toString(hist));
%>