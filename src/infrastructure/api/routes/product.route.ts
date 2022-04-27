import express, { Request, Response } from "express";
import { CreateProductInputDto } from "../../../usecase/product/create/create.product.dto";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    try {
        const customerDto: CreateProductInputDto = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type
        }

        const output = await useCase.execute(customerDto);

        return res.status(200).send(output);
    } catch (err) {
        return res.status(500).send(err);
    }
});

productRoute.get("/", async(_req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    try {
        const output = await useCase.execute({});
        return res.status(200).send(output);
    } catch (err) {
        return res.status(500).send(err);
    }
});