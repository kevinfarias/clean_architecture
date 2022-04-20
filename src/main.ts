import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";

let customer = new Customer("123", "Wesley Willians");

const address = new Address("Rua dois", 2, "12345-678", "Sao Paulo");

customer.Address = address;