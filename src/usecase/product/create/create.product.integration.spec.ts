import { ProductTypes } from "./create.product.dto"
import CreateProductUseCase from "./create.product.usecase";
import { Sequelize } from 'sequelize-typescript';
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const CreateProductData = () => {
    const input = {
        name: "Product A",
        type: ProductTypes.A,
        price: 15
    };
    
    return input;
}

describe("Integration testing the create product use case", () => {
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
    it("should create a product", async () => {
        const input = CreateProductData();
        const customerRepository = new ProductRepository();
        const customerUseCase = new CreateProductUseCase(customerRepository);

        const result = await customerUseCase.execute(input);

        expect(result).toEqual({
            id: expect.any(String),
            ...input
        })
    })

    it("should throw an error when price is lower than 0", async () => {
        const input = CreateProductData();
        const customerRepository = new ProductRepository();
        const customerUseCase = new CreateProductUseCase(customerRepository);
        
        input.price = 0;

        await expect(() => customerUseCase.execute(input)).rejects.toThrowError("Price must be greater than 0");
    });

    it("should throw an error when name is missing", async () => {
        const input = CreateProductData();
        const customerRepository = new ProductRepository();
        const customerUseCase = new CreateProductUseCase(customerRepository);
        
        input.name = "";

        await expect(() => customerUseCase.execute(input)).rejects.toThrowError("Name is required");
    });

    afterEach(async () => {
        await sequelize.close();
    });
})