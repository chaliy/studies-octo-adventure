package transport;

public class Transport {
	
	public static void main(String[] args) {
		Car car1 = new Car();
		
		car1.start();
		car1.refuel(150.0f);
		car1.start();
		car1.stop();
		
		Express express1 = new Express();
		
		express1.start();
		express1.stop();
	}
}
