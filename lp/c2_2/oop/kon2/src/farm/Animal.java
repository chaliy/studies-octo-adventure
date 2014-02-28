package farm;

import java.util.Random;

public class Animal {
	private final Random rnd = new Random( 19580427 );
	
	private final AnimalKind kind;
	private String name;
	private boolean sleep;
	
	public Animal(AnimalKind kind)
	{
		assert kind != null;
		this.kind = kind;
		this.name = "";
	}
	
	public Animal(AnimalKind kind, String name)
	{
		this(kind);
		
		assert name != null;
		
		this.name = name;
	}

	public AnimalKind getKind(){
		return this.kind;
	}
	
	public void say(){
		System.out.println(this.kind.getWhatToSay() + "!");
	}
	
	public void sayName(){
		System.out.println(this.kind.getWhatToSay() + " " + this.name + " " + this.kind.getWhatToSay() + "!");
	}

	public void rename(String newName){
		assert newName != null;
		this.name = newName;
	}
	
	public String getName(){
		return this.name;
	}	
	
	public void newName(){
		String[] names = this.kind.getNames();
		String newName = names[rnd.nextInt(names.length - 1)];
		rename(newName);
	}
	
	public void sleep(){
		assert this.sleep == false;
		
		System.out.println("Good night " + this.name);
		this.sleep = true;
	}
	
	public void waikup(){
		assert this.sleep == true;
		
		System.out.println("Good morning " + this.name);
		this.say();
		this.sleep = false;
	}
	
	public boolean isSleep(){
		return this.sleep;
	}

	@Override
	public String toString() {
		return "Animal " + kind + " with name " + name + " " + (sleep ? "sleeps now" : "does not sleep now");
	}
	
	
}
