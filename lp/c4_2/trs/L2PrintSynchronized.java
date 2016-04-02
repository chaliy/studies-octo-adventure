import java.util.Random;
import java.util.Queue;

public class L2PrintSynchronized {
  
    private static final Random rnd = new Random();
    private static final Object sync = new Object();
  
    private static Thread createSyncCaller(String msg){
      return new Thread(() -> {
        try{
          
          synchronized(sync) {
            System.out.print("[" + msg);
            Thread.sleep(500);
            System.out.println("]");
          }
        
        } catch(InterruptedException ex) {
          Thread.currentThread().interrupt();
        }
      });
    }
    
    private static Thread createCaller(String msg){
      return new Thread(() -> {
        try{
                    
          System.out.print("[" + msg);
          Thread.sleep(500);
          System.out.println("]");          
        
        } catch(InterruptedException ex) {
          Thread.currentThread().interrupt();
        }
      });
    }

    public static void main(String[] args) {   
      
      // Не синхронізована версія
      
      Thread[] callers = {
        createCaller("Прізвище Ім'я Побатькові"),
        createCaller("Чалий Михайло Васильович"),
        createCaller("КНз-41"),
        createCaller("mike@chaliy.name")  
      }; 
          
      for(Thread caller : callers) { caller.start(); }
      
      // Cинхронізована версія
      
      Thread[] syncCallers = {
        createSyncCaller("Прізвище Ім'я Побатькові"),
        createSyncCaller("Чалий Михайло Васильович"),
        createSyncCaller("КНз-41"),
        createSyncCaller("mike@chaliy.name")  
      }; 
          
      for(Thread caller : syncCallers) { caller.start(); }
      
    }

}