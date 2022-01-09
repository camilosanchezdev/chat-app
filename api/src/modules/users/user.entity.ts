import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ContactEntity } from '../contacts/contact.entity'
import { MessageEntity } from '../messages/message.entity'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ select: false })
    password: string

    @OneToMany((_type) => ContactEntity, (x) => x.user)
    @JoinTable()
    contacts: ContactEntity[]

    @OneToMany((_type) => MessageEntity, (x) => x.sender)
    @JoinTable()
    sentMessages: MessageEntity[]

    @OneToMany((_type) => MessageEntity, (x) => x.receiver)
    @JoinTable()
    receivedMessages: MessageEntity[]
}
