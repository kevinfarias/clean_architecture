import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345",
                },
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("12345");
    });

    it("should fail and return an error 500", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: ""
            });

        expect(response.status).toBe(500);
    });

    it("should list all customers", async() => {
        const createCustomer1 = await request(app)
            .post("/customer")
            .send({
                name: "John Doe 1",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345",
                },
            });

        expect(createCustomer1.status).toBe(200);
        
        const createCustomer2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane Doe 2",
                address: {
                    street: "Street 2",
                    city: "City",
                    number: 123,
                    zip: "12345",
                },
        })
        expect(createCustomer2.status).toBe(200);
        
        const response = await request(app)
            .get("/customer")
            .send();
        
        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBe(2);
        
        expect(response.body.customers[0].name).toBe("John Doe 1");
        expect(response.body.customers[0].address.street).toBe("Street");

        expect(response.body.customers[1].name).toBe("Jane Doe 2");
        expect(response.body.customers[1].address.street).toBe("Street 2");
    });

    afterAll(async () => {
        await sequelize.close();
    });
});