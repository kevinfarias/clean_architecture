import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const product = ProductFactory.create("a", "Product A", 15);

const input = {
    id: product.id,
    name: "Product A Updated",
    price: 25
}

describe("Integration test for update product use case", () => {
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
    it("should update a product successfully", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        await productRepository.create(product);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw an error when name is blank", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        await productRepository.create(product);

        input.name = "";
        input.price = 10;

        await expect(() => useCase.execute(input)).rejects.toThrowError("Name is required");
    });

    it("should throw an error when price lower or equal than 0", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        await productRepository.create(product);

        input.name = "Teste";
        input.price = 0;

        await expect(() => useCase.execute(input)).rejects.toThrowError("Price must be greater than 0");
    });

    afterEach(async () => {
        await sequelize.close();
    });
});