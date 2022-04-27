import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { CreateProductInputDto, CreateProductOutputDto } from "./create.product.dto";

export default class CreateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input: CreateProductInputDto): Promise<CreateProductOutputDto> {
        const product = ProductFactory.create(input.type, input.name, input.price);

        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            type: input.type
        }
    }
}