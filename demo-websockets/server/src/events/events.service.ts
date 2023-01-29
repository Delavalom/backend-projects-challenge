import { Injectable, Logger } from "@nestjs/common";
import { MessageSchema, messageSchema} from './events.model'

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name)

    messages: MessageSchema[] = []
    clientToUser = {}

    create(message: MessageSchema) {
        this.messages.push(message)
        return message
    }

    getAll() {
        return this.messages
    }

    identify(name: string, clientId: string) {
        this.clientToUser[clientId] = name
        return this.clientToUser
    }

    getClientName(clientId: string) {
        return this.clientToUser[clientId]
    }
}
