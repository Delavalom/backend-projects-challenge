import {
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { EventsService } from "./events.service";
import { MessageSchema, messageSchema } from "./events.model";
import { Logger } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(EventsGateway.name);

  constructor(private eventsService: EventsService) {}

  @SubscribeMessage("createMessage")
  async create(@MessageBody() payload: MessageSchema) {
    try {
      const message = await this.eventsService.create(payload);
      this.logger.log(message);
      this.server.emit("message", message);

      return message;
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage("findAll")
  findAll() {
    return this.eventsService.getAll();
  }

  @SubscribeMessage("joinRoom")
  joinRoom(
    @MessageBody("name") name: string,
    @ConnectedSocket() client: Socket
  ) {
    return this.eventsService.identify(name, client.id);
  }

  @SubscribeMessage("typing")
  async typing(
    @MessageBody("isTyping") isTyping: boolean,
    @ConnectedSocket() client: Socket
  ) {
    const name = await this.eventsService.getClientName(client.id);
    client.broadcast.emit("typing", { name, isTyping });
  }
}
