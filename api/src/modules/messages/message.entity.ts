import { Entity, Column, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../users/user.entity'

@Entity('messages')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @Column()
    date: Date

    @Column({ name: 'readed_at', nullable: true })
    readedAt: Date

    @ManyToOne((_type) => UserEntity, (x) => x.sentMessages)
    sender: UserEntity

    @ManyToOne((_type) => UserEntity, (x) => x.receivedMessages)
    receiver: UserEntity
}
