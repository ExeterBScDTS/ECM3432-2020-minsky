<%@page import="minskyone.*,java.util.List,java.security.Principal"%>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/static/css/bootstrap.min.css">

    <!-- Custom styles for this template -->
    <!-- <link href="../bootstrap/starter-template.css" rel="stylesheet"> -->

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
            <form class="form-inline my-2 my-lg-0" method="get" action="account.jsp">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><%= user %></button>
            </form>
          </div>
        </nav>

  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Device</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>

<%
  Status status = new Status();
  List<Sensor> sensors = status.getSensors();
  
  for(Sensor s: sensors){
     out.print( s.htmlTr() ); 
  }

%>
  </tbody>
  </table>
  </body>
</html>