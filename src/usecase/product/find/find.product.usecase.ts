import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const result = await this.productRepository.find(input.id);

        return {
            id: result.id,
            name: result.name,
            price: result.price
        }
    }
}