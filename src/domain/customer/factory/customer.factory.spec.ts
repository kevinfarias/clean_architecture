import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Rua das couves", 123, "12311-111", "Tapejara");
        const customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toMatchObject(address);
    })
});