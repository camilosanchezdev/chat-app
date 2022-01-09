import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../users/user.entity'
import { MessageRepository } from './message.repository'

@Injectable()
export class MessagesService {
    constructor(@InjectRepository(MessageRepository) private messageRepository: MessageRepository) {}
    getConversation(sender: UserEntity, receiverId: number) {
        return this.messageRepository
            .createQueryBuilder('messages')
            .leftJoinAndSelect('messages.sender', 'user.sentMessages')
            .leftJoinAndSelect('messages.receiver', 'user.receivedMessages')
            .where('(messages.sender.id = :id AND messages.receiver.id = :receiverid) OR (messages.sender.id = :receiverid OR messages.receiver.id = :id)', {
                id: sender.id,
                receiverid: receiverId,
            })
            .select([
                'messages.id',
                'messages.message',
                'messages.date',
                'user.sentMessages.id',
                'user.sentMessages.username',
                'user.receivedMessages.id',
                'user.receivedMessages.username',
            ])
            .orderBy('messages.date', 'ASC')
            .getMany()
    }
}
