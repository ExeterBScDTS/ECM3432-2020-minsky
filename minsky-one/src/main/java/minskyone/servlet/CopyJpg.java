package minskyone.servlet;

import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import javax.imageio.ImageIO;
import java.awt.geom.AffineTransform;
//import java.awt.image.AffineTransformOp;

// See https://www.quickprogrammingtips.com/java/how-to-rotate-an-image-using-affine-transform-in-java.html

public class CopyJpg {

    public static void writeJPG(FileInputStream in,  OutputStream out){
        try {
            BufferedImage source = ImageIO.read(in);
            //BufferedImage output = new BufferedImage(source.getHeight(), source.getWidth(), source.getType());
            //AffineTransformOp op = new AffineTransformOp(rotateClockwise90(source), AffineTransformOp.TYPE_BILINEAR);
            //op.filter(source, output);
            //ImageIO.write(output, "JPG", out);
            ImageIO.write(source, "JPG", out);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

        // Rotates clockwise 90 degrees. Uses rotation on center and then translating it to origin
        private static AffineTransform rotateClockwise90(BufferedImage source) {
            AffineTransform transform = new AffineTransform();
            transform.rotate(Math.PI/2, source.getWidth()/2, source.getHeight()/2);
            double offset = (source.getWidth()-source.getHeight())/2;
            transform.translate(offset,offset);
            return transform;
        }
         
        // Rotates counter clockwise 90 degrees. Uses rotation on center and then translating it to origin
        private static AffineTransform rotateCounterClockwise90(BufferedImage source) {
            AffineTransform transform = new AffineTransform();
            transform.rotate(-Math.PI/2, source.getWidth()/2, source.getHeight()/2);
            double offset = (source.getWidth()-source.getHeight())/2;
            transform.translate(-offset,-offset);
            return transform;
        }
}