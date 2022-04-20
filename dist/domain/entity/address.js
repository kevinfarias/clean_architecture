"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, number, zip, city) {
        this.street = "";
        this.number = 0;
        this.zip = "";
        this.city = "";
        this.street = street;
        this.number = number;
        this.zip = zip;
        this.city = city;
        this.validate();
    }
    validate() {
        if (this.street.length === 0) {
            throw new Error("Street is required");
        }
        if (this.number === 0) {
            throw new Error("Number is required");
        }
        if (this.zip.length === 0) {
            throw new Error("Zip is required");
        }
        if (this.city.length === 0) {
            throw new Error("City is required");
        }
    }
    toString() {
        return `${this.street}, ${this.number}, ${this.zip} ${this.city}`;
    }
}
exports.default = Address;
