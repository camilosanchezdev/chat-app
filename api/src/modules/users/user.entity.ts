import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ContactEntity } from '../contacts/contact.entity'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @OneToMany((_type) => ContactEntity, (x) => x.user)
    @JoinTable()
    contacts: ContactEntity[]

    // @ManyToOne((_type) => UserEntity, (type) => type.contacts)
    // belongsToContacts: UserEntity[]
}
