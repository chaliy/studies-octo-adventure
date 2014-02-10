package transport;

public abstract class Vehicle {
	
	protected boolean beforeStart(){
		return true;
	}
	
	public void start(){
		System.out.printf("Start engines of the %s...%n", getName());
		if (beforeStart()){
			System.out.printf("Engines of the %s started!%n", getName());	
		}
	}
	
	protected void afterStop(){
	}
	
	public void stop(){
		System.out.printf("Stop engines of the %s...%n", getName());
		afterStop();
	}
	
	abstract int getWheelsNum();
	
	abstract String getName();
}
