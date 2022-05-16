import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../users/user.entity'
import { UsersRepository } from '../users/users.repository'
import { SendMessageDto } from './dto/send-message.dto'
import { MessageEntity } from './message.entity'
import { MessageRepository } from './message.repository'

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageRepository) private messageRepository: MessageRepository,
        @InjectRepository(UsersRepository) private userRepository: UsersRepository
    ) {}

    async getConversation(sender: UserEntity, receiverId: number) {
        const messages = await this.messageRepository
            .createQueryBuilder('messages')
            .leftJoinAndSelect('messages.sender', 'user.sentMessages')
            .leftJoinAndSelect('messages.receiver', 'user.receivedMessages')
            .where('(messages.sender.id = :id AND messages.receiver.id = :receiverid) OR (messages.sender.id = :receiverid AND messages.receiver.id = :id)')
            .orderBy('messages.date', 'ASC')
            .setParameters({ id: sender.id, receiverid: receiverId })
            .getMany()

        this.markMessagesAsReaded(messages, sender)
        return messages
    }

    async sendMessage(sender: UserEntity, sendMessageDto: SendMessageDto) {
        const { receiverId, message } = sendMessageDto
        const receiver = await this.userRepository.findOne({ id: receiverId })
        const newMessage = this.messageRepository.create({ message: message, date: new Date(), sender: sender, receiver })
        try {
            await this.messageRepository.save(newMessage)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
        return newMessage
    }
    async markMessagesAsReaded(messages: MessageEntity[], user: UserEntity) {
        try {
            messages.forEach(async (message) => {
                if (message.receiver.id === user.id) {
                    message.readedAt = new Date()
                    await this.messageRepository.save(message)
                }
            })
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
        return user
    }
    async markAsRead(user: UserEntity, senderId: number) {
        try {
            const sender = await this.userRepository.findOne({ id: senderId })

            const messages = await this.messageRepository.find({
                relations: ['sender', 'receiver'],
                where: {
                    readedAt: null,
                    sender: sender,
                    receiver: user,
                },
            })
            if (messages.length > 0) {
                messages.forEach(async (message) => {
                    message.readedAt = new Date()
                    await this.messageRepository.save(message)
                })
            }
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
        return null
    }
}
