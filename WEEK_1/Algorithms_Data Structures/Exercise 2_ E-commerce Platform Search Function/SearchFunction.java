import java.util.Arrays;
import java.util.Comparator;

public class SearchFunction {

    
    public static Product linearSearch(Product[] products, int id) {

        for (Product product : products) {
            if (product.productId == id) {
                return product;
            }
        }
        return null;
    }

    
    public static Product binarySearch(Product[] products, int id) {

        int left = 0;
        int right = products.length - 1;

        while (left <= right) {

            int mid = (left + right) / 2;

            if (products[mid].productId == id) {
                return products[mid];
            }

            if (products[mid].productId < id) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return null;
    }

    public static void main(String[] args) {

        Product[] products = {
                new Product(105, "Laptop", "Electronics"),
                new Product(102, "Shoes", "Fashion"),
                new Product(108, "Mobile", "Electronics"),
                new Product(101, "Watch", "Accessories"),
                new Product(110, "Headphones", "Electronics")
        };

        System.out.println("Linear Search:");

        Product result1 = linearSearch(products, 108);

        if (result1 != null) {
            System.out.println("Product Found: " + result1.productName);
        } else {
            System.out.println("Product Not Found");
        }

        Arrays.sort(products, Comparator.comparingInt(p -> p.productId));

        System.out.println("\nBinary Search:");

        Product result2 = binarySearch(products, 108);

        if (result2 != null) {
            System.out.println("Product Found: " + result2.productName);
        } else {
            System.out.println("Product Not Found");
        }
    }
}