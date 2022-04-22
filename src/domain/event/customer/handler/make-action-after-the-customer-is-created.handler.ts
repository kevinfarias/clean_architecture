import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class MakeActionAfterTheCustomerIsCreated implements EventHandlerInterface<CustomerCreatedEvent> {
    private _messageToLog: string = "Default logging...";

    setMessageToLog(message: string) {
        this._messageToLog = message;
    }

    handle(event: CustomerCreatedEvent): void {
        console.log(this._messageToLog);
    }
}