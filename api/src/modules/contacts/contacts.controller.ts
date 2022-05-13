import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
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

    @Post('/add')
    addContact(@GetUser() user: UserEntity, @Body('contactId') contactId: number): Promise<any> {
        return this.contactsService.addContact(user, contactId)
    }
    @Delete('/remove/:id')
    removeContact(@GetUser() user: UserEntity, @Param('id') contactId: number): Promise<any> {
        return this.contactsService.removeContact(user, contactId)
    }
}
