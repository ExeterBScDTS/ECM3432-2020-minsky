package minskyone;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class HistogramData {

    public static int[] getData(String filename, int num_bins, int scale_max) throws IOException
    {   
        int[] hist = new int[num_bins];

        DataInputStream in;
        in = new DataInputStream(new FileInputStream(filename));
        Float[] f = new Float[24 * 32];

        for(int y=0; y <24; y++){
            for(int x=0; x<32; x++){
                f[y * 32 + x] = ByteSwapper.swap(in.readFloat());
            }
        }
        in.close();

        List<Float>  ir = Arrays.asList(f);
        //float ir_min = Collections.min(ir);
        //float ir_max = Collections.max(ir);
        float ir_min = 0.0f;
        float ir_max = 50.0f;

        double start = Math.floor(ir_min / 10.0) * 10.0;
        double end = Math.ceil(ir_max / 10.0) * 10.0;
        double bin_width = (end-start) / num_bins;

        Double[] histD = new Double[num_bins];

        for( double el : ir){
            double v = el - start;
            int bin = (int)Math.abs(v / bin_width);
            hist[bin]++;
        }

        if(scale_max != 0){
            for(int i=0; i<hist.length; i++){
                histD[i] = 0.0 + hist[i];
            }

            double scale = (double)scale_max / Collections.max(Arrays.asList(histD));
        
            for(int i=0; i<hist.length; i++){
                hist[i] = (int)(scale * hist[i]);
            }
        }

        return hist;
    }

}
