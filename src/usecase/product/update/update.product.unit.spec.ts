import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product A", 15);

const input = {
    id: product.id,
    name: "Product A Updated",
    price: 25
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test for update product use case", () => {
    it("should update a product successfully", async () => {
        const productRepository = MockRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw an error when name is blank", async () => {
        const productRepository = MockRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        input.name = "";
        input.price = 10;

        expect(async () => await useCase.execute(input)).rejects.toThrowError("Name is required");
    });

    it("should throw an error when price lower or equal than 0", async () => {
        const productRepository = MockRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        input.name = "Teste";
        input.price = 0;

        expect(async () => await useCase.execute(input)).rejects.toThrowError("Price must be greater than 0");
    });
});