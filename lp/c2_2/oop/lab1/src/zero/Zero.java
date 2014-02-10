package zero;

public class Zero {

	public static void main(String[] args) {
				
		System.out.println("2.5.1");
		
		int i1 = 12345678;
		int i2 = 0777;
		int i3 = 0X77FF;
		
		System.out.printf("I1: %d, I2: %d, I3: %d%n", i1, i2, i3);

		
		System.out.println("2.5.3");
		
		System.out.println('\123');
		System.out.println('\346'); 
		System.out.println('\u0053'); 
		System.out.println('\u0416');
		
		System.out.println("2.5.4");
		
		String s1 = "Цей рядок\nз переносом";
		String s2 = "\"Карпати\" — Чемпіон!";

		System.out.printf("%s%n%s%n", s1, s2);
						
		System.out.println("2.6");
		for (int i = 30; i < 40; i++) {
			if (Character.isJavaIdentifierPart((char)i))
				System.out.println(Integer.toString(i)+ "  " + (char)i + "  is Java Identifier Part Symbol" );
			else
				System.out.println(Integer.toString(i)+ "  " + (char)i + "  isn't Java Identifier Part Symbol" );
		}
		
		System.out.println("2.7.2");
		
		boolean b = true;
		boolean bb = false;
		
		System.out.printf("b == bb: %b, b != bb: %b%n", b == bb,  b != bb);			
				
		System.out.println("2.7.3");
		
		System.out.printf("b && bb: %b, b || bb: %b%n", b && bb,  b || bb);
		
		System.out.println("2.7.4");
		
		byte b1 = 50, b2 = -99, bЗ; 
		short det = 0, ind = 1; 
		int i = -100, j = 100; 
		long big = 50, veryBig = 2147483648L; 
		char c1 = 'A', c2 = '?', newLine = '\n';
		
		System.out.printf("b1: %d, b2: %dv", b1, b2);
		
		System.out.println("2.7.5.1");
		
		System.out.printf("5%%2: %d, (-5)%%3 : %d%n", 5%2, (-5)%3);
		
		System.out.println("2.7.5.2");
		
		short k = (short)(b1 + b2);
		
		System.out.printf("k: %d%n", k);
		
		System.out.println("2.7.5.3");

		System.out.printf("3 != 5: %b, 3 == 5: %b%n", 3 != 5, 3 == 5);
		
		System.out.println("2.7.5.4");
		
		System.out.printf("~b2: %d, b1 & b2: %d, b1 | b2:%d, b1 ^ b2: %d%n", ~b2, b1 & b2, b1 | b2, b1 ^ b2);
				
		System.out.println("2.7.5.5");
		
		System.out.printf("b1 << 2: %d, b1 >> 2: %d%n", b1 << 2 , b1 >> 2);
		
		System.out.println("2.7.6");
		
		float x = 0.001f; 
		float y = -34.789f;
		double xy = -16.2305; 

		System.out.printf("x: %f, y: %f%n", x, y);
		
		System.out.println("2.7.7");
		
		x = 3.5f;
		y = 2 * (x - 0.567f) / (x + 2);
		b = x < y;
		bb = x >= y && b;
		
		System.out.printf("b: %b, bb: %b%n", b, bb);
		
		System.out.println("2.7.8");
		
		System.out.printf("x < 0 ? 0 : x: %f, x > y ? x - y : x + y: %f%n", x < 0 ? 0 : x, x > y ? x - y : x + y);	
	}
}
