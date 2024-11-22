import { EventHandlerInterface } from "../../../@shared/event/eventHandler.interface";
import { CustomerCreatedEvent } from "../customerCreated.event";

export class EnviaConsoleLog2 implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated")
  }
}