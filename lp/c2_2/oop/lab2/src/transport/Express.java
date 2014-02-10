package transport;

public class Express extends Train {
	
	public Express(){
		super(4);
	}

	@Override
	protected boolean beforeStart(){
		infoPassengers("Express is about to start, be carefull!");
		
		return super.beforeStart();
	}
	
	@Override
	public void afterStop(){		
		infoPassengers("Express arrived. You can leave train.");
	}
	
	private void infoPassengers(String msg){
		System.out.printf("Inform Passengers: %s%n", msg);
	}
	
	@Override
	String getName() { 
		return "express train";
	}
}
