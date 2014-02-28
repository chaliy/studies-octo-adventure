package farm;

public enum AnimalKind {
	CAT(new String[]{ "Barsik", "Murka" }, "Myau"),
	DOG(new String[]{ "Sharik", "Tuzik" }, "Gav"),
	COW(new String[]{ "Zorka", "Burenka" }, "Muu"),
	ELEFANT(new String[]{ "Arcenyi" }, "Uuuu"),
	FOX(new String[]{ "Hitrunka" }, "Tyaf");

	private String[] defaultNames;
	private final String whatToSay;
	
	private AnimalKind(String[] names, String whatToSay) {
        this.defaultNames = names;
        this.whatToSay = whatToSay;
    }
	
	public String[] getNames(){
		return this.defaultNames;
	}
	
	public String getWhatToSay(){
		return this.whatToSay;
	}
}
