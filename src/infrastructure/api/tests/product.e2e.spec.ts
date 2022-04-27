import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product A",
                type: "a",
                price: 150
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product A")
        expect(response.body.price).toBe(150);
    });

    it("should fail and return an error 500", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: ""
            });

        expect(response.status).toBe(500);
    });

    it("should list all products", async() => {
        const createProductA = await request(app)
            .post("/product")
            .send({
                name: "Product A",
                type: "a",
                price: 150
            });

        expect(createProductA.status).toBe(200);
        
        const createProductB = await request(app)
            .post("/product")
            .send({
                name: "Product B",
                type: "b",
                price: 120
            });

        expect(createProductB.status).toBe(200);
        
        const response = await request(app)
            .get("/product")
            .send();
        
        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);
        
        expect(response.body.products[0].name).toBe("Product A");
        expect(response.body.products[0].price).toBe(150);

        expect(response.body.products[1].name).toBe("Product B");
        expect(response.body.products[1].price).toBe(240);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});