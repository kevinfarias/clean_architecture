"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customerId, items) {
        this._items = [];
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw new Error("Item amount must be greater than 0");
        }
        return true;
    }
    total() {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
}
exports.default = Order;
