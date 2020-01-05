<%@page import="java.security.Principal"%>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../bootstrap/4.1.3/css/bootstrap.min.css">
    <!-- Custom styles for this template -->
    <link href="../bootstrap/starter-template.css" rel="stylesheet">

    <title>Minsky One</title>
  </head>
  <%
  String user = "logged out";
  Principal prin = request.getUserPrincipal();
  if(prin != null){
    user = prin.getName();
  }
  %>
  <body>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a class="navbar-brand" href="index.jsp">Minsky One</a>
          <div class="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
            <form class="form-inline my-2 my-lg-0" method="get" action="authorised">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><%= user %></button>
            </form>
          </div>
        </nav>
        <main role="main" class="container">
      <form method="GET" action="logout.jsp">
      <table border="0" cellspacing="2" cellpadding="1">
      <tr>
        <td>Username:</td>
        <td><input size="12" value="<%= user %>" readonly maxlength="25" type="text"></td>
      </tr>
      <tr>
        <td colspan="2" align="center">
          <input name="submit" type="submit" value="Sign out">
        </td>
      </tr>
      </table>
      </form>
      </main>
  </body>
</html>