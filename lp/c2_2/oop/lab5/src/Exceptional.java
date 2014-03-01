
public class Exceptional {

	
	public static void main(String[] args){
		
		int val1 = 12;
		int val2 = 0;
		
		try
		{
			int result = val1/val2;
			System.out.println("Result is: " + result);
		}
		catch(ArithmeticException e){			
			e.printStackTrace();
		}

		
		int[] arrayOfInts = new int[]{1,2,3,4};
		
		try{
			int result = arrayOfInts[10];
			System.out.println("Result is: " + result);
		} catch(ArrayIndexOutOfBoundsException e){
			e.printStackTrace();
		}
	}
	
}
