<%@page import="minskyone.*"%>
<%
    String cmd = Utils.getParameter(request, "minsky.process.camera");
    Processes.launch("minsky.process.camera", cmd);

    // response.sendRedirect("../");
    out.println("Launched " + cmd);
%>
