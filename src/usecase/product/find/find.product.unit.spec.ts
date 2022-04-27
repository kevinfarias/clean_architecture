import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product A", 123);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit testing the find product use case", () => {
    it("should return a product successfully", async () => {
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository);

        await productRepository.create(product);

        const result = await useCase.execute({ id: product.id });

        expect(result).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        })
    })

    it("should throw an error when trying to search a product that does not exists", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const useCase = new FindProductUseCase(productRepository);

        expect(async () => await useCase.execute({ id: product.id })).rejects.toThrowError("Product not found");
    })
})