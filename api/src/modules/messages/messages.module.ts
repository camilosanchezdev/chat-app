import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageRepository } from './message.repository'
import { UsersModule } from '../users/users.module'
import { UsersRepository } from '../users/users.repository'

@Module({
    imports: [TypeOrmModule.forFeature([MessageRepository, UsersRepository]), UsersModule],
    providers: [MessagesService],
    controllers: [MessagesController],
})
export class MessagesModule {}
