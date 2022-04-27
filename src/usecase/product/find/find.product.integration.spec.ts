import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import FindProductUseCase from './find.product.usecase';

const product = new Product("123", "Product A", 123);
describe("Integration testing in the find product usecase", () => {
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

    it("should find a costumer successfully", async () => {
        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository);

        await productRepository.create(product);

        const result = await useCase.execute(product);

        expect(result).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    })

    afterEach(async () => {
        await sequelize.close();
    });
})