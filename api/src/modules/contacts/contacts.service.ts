import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../users/user.entity'
import { ContactRepository } from './contact.repository'

@Injectable()
export class ContactsService {
    constructor(@InjectRepository(ContactRepository) private contactRepository: ContactRepository) {}
    getAll(user: UserEntity): Promise<any> {
        return this.contactRepository
            .createQueryBuilder('user_contacts')
            .leftJoinAndSelect('user_contacts.user_contact', 'user')
            .where('userId = :id', { id: user.id })
            .select(['user_contacts.id', 'user.id', 'user.username'])
            .getMany()
    }
}
