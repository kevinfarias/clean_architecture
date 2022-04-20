"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
describe("Product repository test", () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
    });
    afterEach(async () => {
        await sequelize.close();
    });
});
