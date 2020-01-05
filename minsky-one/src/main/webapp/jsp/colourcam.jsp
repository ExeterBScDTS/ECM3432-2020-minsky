<%@page import="minskyone.Utils,java.io.*" language="java" contentType="image/png" %><%

  // Important.  Formating of JSP is critical to this script.
  // No whitespace should be present outside the delimiters, not even a newline at the end!
  //

  String filename = Utils.getPath(request, "minsky.camera.colour.jpgpath"); 
  File file = new File(filename);
  FileInputStream in = new FileInputStream(file);
  OutputStream outs = response.getOutputStream();
  byte[] buffer = new byte[1024];
    while (true) {
      int bytesRead = in.read(buffer);
      if (bytesRead == -1)
        break;
      outs.write(buffer, 0, bytesRead);
    }
    outs.flush();
%>