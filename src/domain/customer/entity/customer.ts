import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import eventDispatcher from "../../@shared/eventDispatcher";
import Address from "../value-object/address";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";

export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        
        this.validate();
        this.throw();

        const customerCreatedEvent = new CustomerCreatedEvent({
            id,
            name
        });

        eventDispatcher.notify(customerCreatedEvent);
    }

    throw() {
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }

    get name(): string {
        return this._name;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
        this.throw();
    }

    changeAddress(address: Address) {
        this._address = address;
        this.validate();
        this.throw();

        const event = new CustomerAddressChangedEvent({
            id: this._id,
            name: this._name,
            address: address.toString()
        });
        eventDispatcher.notify(event);
    }

    isActive(): boolean {
        return this._active;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address;
    }

    get Address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}