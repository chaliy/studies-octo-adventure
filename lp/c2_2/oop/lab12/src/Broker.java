import java.util.Scanner;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;

public class Broker {
		
	public static void main(String[] args) {
		
		// Програма моделює обслуговування одного потоку процесів двома 
		// центральними процесорами комп'ютера із загальною чергою. Якщо 
		// черговий процес генерується в мить, коли будь-який з 
		// процесорів вільний, процес поступає на обробку, інакше процес 
		// стає в чергу. Якщо один з процесорів звільняється, і в черзі є 
		// процеси, процес віддаляється з черги. Визначте максимальний 
		// розмір черги для двох однакових процесорів.
		
		final LinkedBlockingQueue<String> workQueue = new LinkedBlockingQueue<String>();
		final AtomicBoolean shouldRun = new AtomicBoolean(true);
		
		Thread t1 = new Thread(new Runnable() {
			@Override
			public void run() {
				while(shouldRun.get()){
					String workDef;
					try {
						workDef = workQueue.take();
						System.out.println("Worker #1: " + workDef + " started");
						Thread.sleep(5000);
						System.out.println("Worker #1: " + workDef + " stopped");
					} catch (InterruptedException e) {
						System.out.println("Worker #1 failed");						
					}
				}
				
			}
		});
		Thread t2 = new Thread(new Runnable() {
			@Override
			public void run() {
				while(shouldRun.get()){
					String workDef;
					try {
						workDef = workQueue.take();
						System.out.println("Worker #2: " + workDef + " started");
						Thread.sleep(20000);
						System.out.println("Worker #2: " + workDef + " stopped");
					} catch (InterruptedException e) {
						System.out.println("Worker #2 failed");						
					}
				}
				
			}
		});
		
		t1.start();
		t2.start();
		
		System.out.println("Enter command to execute, stop to exit");
		
		Scanner in = new Scanner(System.in);
		while(true){			
			String command = in.nextLine();

			if ("stop".equalsIgnoreCase(command)){
				break;
			}
			
			try {
				workQueue.put(command);
			} catch (InterruptedException e) {
				System.out.println("Failed to queue " + command);
			}
		}
		in.close();
		
		System.out.println("Stopping threads...");
		shouldRun.set(false);
		try {
			t1.join();
			t2.join();
		} catch (InterruptedException e) {
			System.out.println("Failed to stop threads...");
		}
		System.out.println("Goodbye!");
	}
	

}
