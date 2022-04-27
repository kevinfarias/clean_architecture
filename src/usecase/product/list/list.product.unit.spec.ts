import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product A", 15);
const product2 = ProductFactory.create("b", "Product B", 25);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    }
};
describe("Unit testing the list product use case", () => {
    it("should return a list of products successfully", async () => {
        const productRepository = MockRepository();
        const useCase = new ListProductUseCase(productRepository);

        const result = (await useCase.execute({})).products;

        expect(result.length).toBe(2);

        expect(result[0].id).toBe(product1.id);
        expect(result[0].name).toBe(product1.name);
        expect(result[0].price).toBe(product1.price);

        expect(result[1].id).toBe(product2.id);
        expect(result[1].name).toBe(product2.name);
        expect(result[1].price).toBe(product2.price);
    });
});