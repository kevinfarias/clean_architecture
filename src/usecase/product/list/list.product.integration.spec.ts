import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";
import { Sequelize } from 'sequelize-typescript';
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const product1 = ProductFactory.create("a", "Product A", 15);
const product2 = ProductFactory.create("b", "Product B", 25);

describe("Integration testing the list product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    it("should return a list of products successfully", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const result = (await useCase.execute({})).products;

        expect(result.length).toBe(2);

        expect(result[0].id).toBe(product1.id);
        expect(result[0].name).toBe(product1.name);
        expect(result[0].price).toBe(product1.price);

        expect(result[1].id).toBe(product2.id);
        expect(result[1].name).toBe(product2.name);
        expect(result[1].price).toBe(product2.price);
    });

    afterEach(async () => {
        await sequelize.close();
    });
});