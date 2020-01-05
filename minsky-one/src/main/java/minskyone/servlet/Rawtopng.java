package minskyone.servlet;

import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.DataBuffer;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.imageio.ImageIO;

import java.awt.image.*;
import java.awt.color.*;
import java.awt.Transparency;

public class Rawtopng {

    // See https://stackoverflow.com/questions/31457055/java-convert-raw-to-jpg-png
    public static void writePNG(FileInputStream in,  OutputStream out){
        // You need to know width/height of the image
        int width = 32;
        int height = 24;

        int samplesPerPixel = 3;
        int[] bandOffsets = {0, 1, 2}; // RGB order

        byte[] rgbPixelData = new byte[width * height * samplesPerPixel];

        try {
            in.read(rgbPixelData, 0, width * height * samplesPerPixel);
        } catch (IOException e) {
            e.printStackTrace();
        }

        DataBuffer buffer = new DataBufferByte(rgbPixelData, rgbPixelData.length);
        WritableRaster raster = Raster.createInterleavedRaster(buffer, width, height, samplesPerPixel * width, samplesPerPixel, bandOffsets, null);

        ColorModel colorModel = new ComponentColorModel(ColorSpace.getInstance(ColorSpace.CS_sRGB), false, false, Transparency.OPAQUE, DataBuffer.TYPE_BYTE);

        BufferedImage image = new BufferedImage(colorModel, raster, colorModel.isAlphaPremultiplied(), null);

        //System.out.println("image: " + image); // Should print: image: BufferedImage@<hash>: type = 0 ...

        try {
            ImageIO.write(image, "PNG", out);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}