"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = false;
        this._rewardPoints = 0;
        this._id = id;
        this._name = name;
        this.validate();
    }
    get id() {
        return this._id;
    }
    validate() {
        if (this.name.length == 0) {
            throw new Error("Name is required");
        }
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
    }
    get name() {
        return this._name;
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    isActive() {
        return this._active;
    }
    activate() {
        if (this.address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    set Address(address) {
        this.address = address;
    }
    get rewardPoints() {
        return this._rewardPoints;
    }
    addRewardPoints(points) {
        this._rewardPoints += points;
    }
}
exports.default = Customer;
