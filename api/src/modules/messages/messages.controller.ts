import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../users/get-user.decorator'
import { UserEntity } from '../users/user.entity'
import { SendMessageDto } from './dto/send-message.dto'
import { MessagesService } from './messages.service'

@Controller('messages')
@UseGuards(AuthGuard())
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @Get(':id')
    getContacts(@GetUser() userSender: UserEntity, @Param('id') receiverId: any): Promise<any> {
        return this.messagesService.getConversation(userSender, receiverId)
    }
    @Post()
    sendMessage(@GetUser() userSender: UserEntity, @Body() sendMessageDto: SendMessageDto): Promise<any> {
        return this.messagesService.sendMessage(userSender, sendMessageDto)
    }
}
