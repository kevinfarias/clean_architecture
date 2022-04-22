import MakeActionAfterTheAddressIsChanged from "../event/handler/make-action-after-the-address-is-changed.handler";
import MakeActionAfterTheCustomerIsCreated from "../event/handler/make-action-after-the-customer-is-created.handler";
import eventDispatcher from "../../@shared/eventDispatcher";
import Address from "../value-object/address";
import Customer from "./customer";

describe("Costumer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        let customer = new Customer("123", "John");
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane")
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "13330-250", "Sao Paulo");

        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    
    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined", () => {
        const customer = new Customer("1", "Customer 1");

        expect(() => customer.activate()).toThrowError("Address is mandatory to activate a customer");
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

    it("should notify the listeners when a new customer is created", () => {
        const enviaConsoleLog1Handler = new MakeActionAfterTheCustomerIsCreated();
        enviaConsoleLog1Handler.setMessageToLog("Esse é o primeiro console.log do evento: CustomerCreated");
        const spyHandler1 = jest.spyOn(enviaConsoleLog1Handler, "handle");

        const enviaConsoleLog2Handler = new MakeActionAfterTheCustomerIsCreated();
        enviaConsoleLog2Handler.setMessageToLog("Esse é o segundo console.log do evento: CustomerCreated");
        const spyHandler2 = jest.spyOn(enviaConsoleLog2Handler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

        const customer = new Customer("123", "Joaozinho");

        expect(spyHandler1).toBeCalled();
        expect(spyHandler2).toBeCalled();
    });

    it("should notify the listeners when a customer has its address changed", () => {
        const enviaConsoleLogHander = new MakeActionAfterTheAddressIsChanged();
        const spyHandler = jest.spyOn(enviaConsoleLogHander, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", enviaConsoleLogHander);

        const customer = new Customer("123", "Joaozinho");
        customer.changeAddress(new Address("Rua das couves", 123, "12312-12", "Tapejara"))

        expect(spyHandler).toBeCalled();
    })
})