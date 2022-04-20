"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./domain/entity/address"));
const customer_1 = __importDefault(require("./domain/entity/customer"));
let customer = new customer_1.default("123", "Wesley Willians");
const address = new address_1.default("Rua dois", 2, "12345-678", "Sao Paulo");
customer.Address = address;
