import java.util.Arrays;
import java.util.Random;


public class i {

    public static void main(String[] args) {
        int reuslt = sumNumbers(200);
        System.out.printf("Result: %d%n", reuslt);
    }

    public static int sumNumbers(int n){
        assert n >= 100 && n <= 999;

        int sum = 0;

        for (int j = 0; j < n; j++) {
            sum += j;
        }
        return sum;
    }

}
