import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../users/get-user.decorator'
import { UserEntity } from '../users/user.entity'
import { MessagesService } from './messages.service'

@Controller('messages')
@UseGuards(AuthGuard())
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @Get(':id')
    getContacts(@GetUser() userSender: UserEntity, @Param('id') receiverId: any): Promise<any> {
        return this.messagesService.getConversation(userSender, receiverId)
    }
}
