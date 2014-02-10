package transport;

public abstract class Train extends Vehicle {
	
	private int carNum;
	
	protected Train(int carNum){
		this.carNum = carNum;
	}

	@Override
	int getWheelsNum() { 
		return carNum * 8;
	}
	
	int getCarNum(){
		return carNum;
	}

}
