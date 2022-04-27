import { ProductTypes } from "./create.product.dto"
import CreateProductUseCase from "./create.product.usecase";

const CreateProductData = () => {
    const input = {
        name: "Product A",
        type: ProductTypes.A,
        price: 15
    };
    
    return input;
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe("Unit testing the create product use case", () => {
    it("should create a product", async () => {
        const input = CreateProductData();
        const customerRepository = MockRepository();
        const customerUseCase = new CreateProductUseCase(customerRepository);

        const result = await customerUseCase.execute(input);

        expect(result).toEqual({
            id: expect.any(String),
            ...input
        })
    })

    it("should throw an error when price is lower than 0", async () => {
        const input = CreateProductData();
        const customerRepository = MockRepository();
        const customerUseCase = new CreateProductUseCase(customerRepository);
        
        input.price = 0;

        await expect(() => customerUseCase.execute(input)).rejects.toThrowError("Price must be greater than 0");
    });

    it("should throw an error when name is missing", async () => {
        const input = CreateProductData();
        const customerRepository = MockRepository();
        const customerUseCase = new CreateProductUseCase(customerRepository);
        
        input.name = "";

        await expect(() => customerUseCase.execute(input)).rejects.toThrowError("Name is required");
    });
})