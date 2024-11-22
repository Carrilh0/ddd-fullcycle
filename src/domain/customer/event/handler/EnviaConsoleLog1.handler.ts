import { EventHandlerInterface } from "../../../@shared/event/eventHandler.interface";
import { CustomerCreatedEvent } from "../customerCreated.event";

export class EnviaConsoleLog1 implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated")
  }
}