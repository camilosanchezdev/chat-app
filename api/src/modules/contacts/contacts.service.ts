import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../users/user.entity'
import { UsersRepository } from '../users/users.repository'
import { ContactRepository } from './contact.repository'
import { ContactsDto } from './dto/contacts.dto'
@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(ContactRepository) private contactRepository: ContactRepository,
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository
    ) {}
    async getAll(user: UserEntity): Promise<ContactsDto[]> {
        const query = await this.contactRepository
            .createQueryBuilder('user_contacts')
            .leftJoinAndSelect('user_contacts.user_contact', 'user')
            .where('userId = :id', { id: user.id })
            .getMany()

        return query.map((x) => x.user_contact)
    }
    async addContact(user: UserEntity, contactId: number): Promise<any> {
        const editUser = await this.usersRepository.findOneOrFail({
            where: { id: user.id },
            relations: ['contacts'],
        })

        const contact = await this.usersRepository.findOneOrFail({ id: contactId })

        if (!editUser || !contact) {
            throw new NotFoundException()
        }
        try {
            const createContact = await this.contactRepository.create({ user: editUser, user_contact: contact })
            await this.contactRepository.save(createContact)
            const contacts = [...editUser.contacts, createContact]

            return await this.usersRepository.save({ ...editUser, contacts })
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
    async removeContact(user: UserEntity, contactId: number): Promise<any> {
        const editUser = await this.usersRepository.findOneOrFail({
            where: { id: user.id },
            relations: ['contacts'],
        })

        const contact = await this.usersRepository.findOneOrFail({ id: contactId })

        if (!editUser || !contact) {
            throw new NotFoundException()
        }
        try {
            const removeContact = await this.contactRepository.findOneOrFail({ where: { user: editUser.id, user_contact: contact.id } })

            const contacts = editUser.contacts.filter((contact) => contact.id !== removeContact.id)

            await this.contactRepository.remove(removeContact)

            return await this.usersRepository.save({ ...editUser, contacts })
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
