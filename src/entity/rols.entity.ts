import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UsersEntity } from './users.entity';
import { PermitsEntity } from './permits.entity';

@Entity({ name: 'rols' })
export class RolsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt: Date;

    // Relación ManyToMany con UsersEntity
    @ManyToMany(() => UsersEntity, (user) => user.rols)
    @JoinTable() // Este decorador solo debe ir aquí
    users: UsersEntity[];

    // Relación ManyToMany con PermitsEntity
    @ManyToMany(() => PermitsEntity, (permit) => permit.rols)
    @JoinTable() // Este decorador solo debe ir aquí
    permisos: PermitsEntity[];
}
