import Product from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) { }

    async execute(_input: InputListProductDto): Promise<OutputListProductDto> {
        const rows = await this.productRepository.findAll();

        return {
            products: OutputMapper.toOutput(rows)
        };
    }
}

class OutputMapper {
    static toOutput(products: Product[]) {
        return products.map((row: Product) => ({
            id: row.id,
            name: row.name,
            price: row.price,
        }));
    }
}