package farm;

import java.util.ArrayList;
import java.util.List;

public class FarmWille {

	public static void main(String[] args) {
		
		
		List<Animal> animals = new ArrayList<Animal>();
		
		Animal murka = new Animal(AnimalKind.CAT, "Vaska");
		murka.sleep();
		murka.waikup();
		animals.add(murka);
		
		Animal randomCat = new Animal(AnimalKind.CAT);
		randomCat.newName();
		randomCat.sayName();
		animals.add(randomCat);
		
		Animal randomDog = new Animal(AnimalKind.DOG);
		randomDog.newName();
		randomDog.sayName();
		animals.add(randomDog);
		
		
		System.out.println("Find all cats");
		for(Animal animal : animals){
			if (animal.getKind() == AnimalKind.CAT){
				System.out.println("Found: " + animal.getName());
			}
		}
		 
		System.out.println("Print all animals");
		for(Animal animal : animals){
			System.out.println(animal);
		}
	}

}
