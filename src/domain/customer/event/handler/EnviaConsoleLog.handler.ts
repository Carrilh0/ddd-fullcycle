import { EventHandlerInterface } from "../../../@shared/event/eventHandler.interface";
import { CustomerCreatedEvent } from "../customerCreated.event";

export class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`)
  }
}