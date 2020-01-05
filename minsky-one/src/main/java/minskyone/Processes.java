package minskyone;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Processes {

    static Map<String, Process> myprocs = new HashMap<String, Process>();

    public static void launch(String id, String cmd)
    {
        Process p = myprocs.get(id);
        if((p != null) && (p.isAlive())){
            return;
        }
        try {
            String[] cmds = cmd.split("\\s+");
            ProcessBuilder pb = new ProcessBuilder(cmds).inheritIO();
            myprocs.put(id, pb.start());
        } catch (IOException e) {
		    e.printStackTrace();
        }
    }
    
    public static void stop(String id) {
        myprocs.get(id).destroy();
    }
}