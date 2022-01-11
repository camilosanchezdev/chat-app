import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ContactEntity } from '../contacts/contact.entity'
import { MessageEntity } from '../messages/message.entity'
import { StatusEntity } from '../statuses/status.entity'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ select: false })
    password: string

    @Column({ default: 1 })
    avatar: number

    @OneToMany((_type) => ContactEntity, (x) => x.user)
    @JoinTable()
    contacts: ContactEntity[]

    @OneToMany((_type) => MessageEntity, (x) => x.sender)
    @JoinTable()
    sentMessages: MessageEntity[]

    @OneToMany((_type) => MessageEntity, (x) => x.receiver)
    @JoinTable()
    receivedMessages: MessageEntity[]

    @ManyToOne((_type) => StatusEntity, (x) => x.user)
    status: StatusEntity
}
