package transport;

public class Car extends Vehicle {
	
	private float gassLevel = 10.0f;	

	@Override
	int getWheelsNum() { 
		return 4;
	}
	
	@Override
	protected boolean beforeStart(){
		if (!enoughGass()){			
			System.out.printf("Not enough gass. Currently have %f%n", gassLevel);
			return false;
		}
		
		return super.beforeStart();
	}
	
	private boolean enoughGass(){
		return gassLevel > 100.0;
	}
	
	public void refuel(float gass){		
		gassLevel += gass;
		System.out.printf("Reguel car with %f, now in backs %f%n", gass, gassLevel);
	}

	@Override
	String getName() { 
		return "car";
	}
	
}
