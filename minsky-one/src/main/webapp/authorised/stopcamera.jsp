<%@page import="minskyone.*"%>
<%
    String cmd = Utils.getParameter(request, "minsky.process.camera");
    Processes.stop("minsky.process.camera");

    // response.sendRedirect("../");
    out.println("Stopped");
%>
