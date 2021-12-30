import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../users/user.entity'

@Entity('user_contacts')
export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_contact: number

    @ManyToOne((_type) => UserEntity, (x) => x.contacts)
    user: UserEntity
}
