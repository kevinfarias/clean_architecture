import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const MockRepository = (product: ProductFactory) => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test for update product use case", () => {
    it("should update a product successfully", async () => {
        const product = ProductFactory.create("a", "Product A", 15);

        const input = {
            id: product.id,
            name: "Product A Updated",
            price: 25
        };

        const productRepository = MockRepository(product);
        const useCase = new UpdateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw an error when name is blank", async () => {
        const product = ProductFactory.create("a", "Product A", 15);

        const input = {
            id: product.id,
            name: "Product A Updated",
            price: 25
        };

        const productRepository = MockRepository(product);
        const useCase = new UpdateProductUseCase(productRepository);

        input.name = "";
        input.price = 10;

        await expect(() => useCase.execute(input)).rejects.toThrowError("product: Name is required");
    });

    it("should throw an error when price lower or equal than 0", async () => {
        const product = ProductFactory.create("a", "Product A", 15);

        const productRepository = MockRepository(product);
        const useCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Product A Updated",
            price: 0
        }

        await expect(() => useCase.execute(input)).rejects.toThrowError("product: Price must be greater than 0");
    });
});