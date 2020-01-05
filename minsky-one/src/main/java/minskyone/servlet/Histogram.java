package minskyone.servlet;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import minskyone.ByteSwapper;
import minskyone.Utils;

public class Histogram extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/plain");
        PrintWriter out = resp.getWriter();
        
        String filename = Utils.getPath(req, "minsky.camera.tir.fltpath"); 
        DataInputStream in = new DataInputStream(new FileInputStream(filename));
        Float[] f = new Float[24 * 32];
        for(int y=0; y <24; y++){
            for(int x=0; x<32; x++){
                f[y * 32 + x] = ByteSwapper.swap( in.readFloat() );
            }
        }
        in.close();

        List<Float>  ir = Arrays.asList(f);
        float ir_min = Collections.min(Arrays.asList(f));
        float ir_max = Collections.max(Arrays.asList(f));

        out.print("Histogram demo"); out.println();

        out.printf("min %f max %f %n", ir_min, ir_max);

        double start = Math.floor(ir_min / 10.0) * 10.0;
        double end = Math.ceil(ir_max / 10.0) * 10.0; 
        double bin_width = (end-start) / 20.0;

        int[] hist = new int[20];

        out.printf("start %f end %f width %f %n", start, end, bin_width);

        for( double el : ir){
            double v = el - start;
            int bin = (int)Math.abs(v / bin_width);
            hist[bin]++;
        }

        for( int n = 0; n < hist.length; n++  ){
            out.printf("%d %d %n", n, hist[n]);
        }
    }

}
