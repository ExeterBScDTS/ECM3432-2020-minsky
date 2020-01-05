<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap/4.1.3/css/bootstrap.min.css">

    <title>Minsky One</title>
  </head>
  <body>
<%
  // N.B. This works if we use a login form, but not if we let Jetty (and browser) manage basic auth.  
  request.getSession(false).invalidate();
  // out.print("<p>Sorry, cannot log out when basic auth in use. Please close your browser.</p>");

  response.sendRedirect("../");
%>
  </body>
</html>