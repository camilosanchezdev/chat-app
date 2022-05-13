import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '../users/users.module'
import { UsersRepository } from '../users/users.repository'
import { ContactRepository } from './contact.repository'
import { ContactsController } from './contacts.controller'
import { ContactsService } from './contacts.service'

@Module({
    imports: [TypeOrmModule.forFeature([ContactRepository, UsersRepository]), UsersModule],
    controllers: [ContactsController],
    providers: [ContactsService],
})
export class ContactsModule {}
