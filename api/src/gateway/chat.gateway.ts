import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets'
// @WebSocketGateway(80, {namespace: 'chat'})
@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server
    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string) {
        this.server.emit('message', message)
    }
}
