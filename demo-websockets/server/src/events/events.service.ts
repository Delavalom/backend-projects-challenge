import { Injectable } from "@nestjs/common";
import { MessageSchema, messageSchema} from './events.model'

@Injectable()
export class EventsService { 
    messages: MessageSchema[] = []
    clientToUser = {}

    create(message: MessageSchema) {
        this.messages.push(message)
        return message
    }

    getAll() {
        return this.messages
    }
    join() {}

    identify(name: string, clientId: string) {
        this.clientToUser[clientId] = name
    }

    getClientName(clientId: string) {
        return this.clientToUser[clientId]
    }
}
