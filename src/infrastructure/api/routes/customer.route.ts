import express, { Request, Response } from "express";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const customerRepository = new CustomerRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    try {
        const customerDto: InputCreateCustomerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,
            }
        }

        const output = await useCase.execute(customerDto);

        return res.status(200).send(output);
    } catch (err) {
        return res.status(500).send(err);
    }
});

customerRoute.get("/", async(req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await useCase.execute({});
        return res.status(200).send(output);
    } catch (err) {
        return res.status(500).send(err);
    }
});