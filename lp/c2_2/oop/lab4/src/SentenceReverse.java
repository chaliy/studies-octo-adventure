
public class SentenceReverse {

	public static void main(String[] args) {

		String input = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus";
		
		System.out.printf("Input: %s%n", input);
		
		String[] tokens = input.split(" ");
		int tokenNum = tokens.length; 
		
		StringBuilder resultBuilder = new StringBuilder();		
		for(int i = tokenNum - 1; i > 0; i--){
			resultBuilder.append(tokens[i]);			
			if (i != 0){
				resultBuilder.append(" ");
			}
		}
	
		String result = resultBuilder.toString();
		
		System.out.printf("Result: %s%n", result);

	}

}
