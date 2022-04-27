import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { UpdateProductInputDto, UpdateProductOutputDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input: UpdateProductInputDto): Promise<UpdateProductOutputDto> {
        const customer = await this.productRepository.find(input.id);
        customer.changeName(input.name);
        customer.changePrice(input.price);

        await this.productRepository.update(customer);

        return {
            id: customer.id,
            name: customer.name,
            price: customer.price
        }
    }
}