import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../users/get-user.decorator'
import { UserEntity } from '../users/user.entity'
import { ContactsService } from './contacts.service'

@Controller('contacts')
@UseGuards(AuthGuard())
export class ContactsController {
    constructor(private contactsService: ContactsService) {}

    @Get()
    getContacts(@GetUser() user: UserEntity): Promise<any> {
        return this.contactsService.getAll(user)
    }
}
