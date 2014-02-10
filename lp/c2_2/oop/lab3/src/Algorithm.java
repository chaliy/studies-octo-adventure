import java.util.Arrays;
import java.util.Random;


public class Algorithm {

	public static void main(String[] args) {
		
		// Задано натуральне число n і масив дійсних чисел a[1..n]. 
		// Визначити добуток непарних елементів, розташованих 
		// після останнього від’ємного елемента.
		
		int n = 20;
		int[] a = new int[n];
		
		// Init
		Random random = new Random();		
		for(int i = 0; i < a.length; i++){
			a[i] = (random.nextInt(200) - 100); // From -100 to 100
		}
		System.out.printf("Array: %s%n", Arrays.toString(a));
		
		// Calculate
		int product = 1;
		boolean negativeFound = false;
		for(int i = 0; i < a.length; i++){
			if (negativeFound){
				if (i%2 != 0){
					product *= a[i];					
				}				
			} else {
				if (a[i] < 0){
					negativeFound = true;
				}
			}
		}
		System.out.printf("Result: %d%n", product);
	}

}
