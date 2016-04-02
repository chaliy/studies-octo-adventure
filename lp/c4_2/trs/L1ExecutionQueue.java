import java.util.Random;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

public class L1ExecutionQueue {
  
    private static final Queue<String> queue = new ConcurrentLinkedQueue<String>();
    private static final Random rnd = new Random();
    
    private static void work(int ms) {
      try{
        int wait = (ms + rnd.nextInt(ms)) / 2;
        Thread.sleep(wait);
      } catch(InterruptedException ex) {
        Thread.currentThread().interrupt();
      }
    }

    public static void main(String[] args) {        
      
      Thread producer = new Thread(() -> {
        for (int x = 0; x < 100; x++) {
          String job = "Job" + x;
          System.out.println("Додаємо роботу: " + job);
          queue.add(job);
          work(300);
        }
      });
      
      Thread consumer = new Thread(() -> {
          for (int x = 0; x < 100; x++) {
             String job = queue.poll();
             if (job == null) {
               System.out.println("В черзі немає роботи, чекаємо");
               work(500);
             } else {
               System.out.println("Виконуємо роботу " + job + ", ще залишилось: " + queue.size());
               work(1000); // Emulate hard work :)
             }
          }           
      });
      
      producer.start();
      consumer.start();
    }

}