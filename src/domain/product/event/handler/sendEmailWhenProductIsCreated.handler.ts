import { EventInterface } from "../../../@shared/event/event.interface";
import { EventHandlerInterface } from "../../../@shared/event/eventHandler.interface";
import { ProductCreatedEvent } from "../productCreated.event";

export class SendEmailWhenProductIsCreatedHandler 
implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: EventInterface): void {
    console.log(`Sending email to .....`)
  }
}