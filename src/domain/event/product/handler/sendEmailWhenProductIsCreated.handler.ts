import { EventInterface } from "../../@shared/event.interface";
import { EventHandlerInterface } from "../../@shared/eventHandler.interface";
import { ProductCreatedEvent } from "../productCreated.event";

export class SendEmailWhenProductIsCreatedHandler 
implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: EventInterface): void {
    console.log(`Sending email to .....`)
  }
}