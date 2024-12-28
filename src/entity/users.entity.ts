

import { Column,CreateDateColumn,Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RolsEntity } from './rols.entity';

@Entity({name: 'users'})
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn({
        type:'timestamp',
        name:'created_at'
    })
    createdAt: Date;
    
    @UpdateDateColumn({
        type:'timestamp',
        name:'updated_at'
    })
    updatedAt:Date;
    @ManyToMany(() => RolsEntity,(rol) => rol.users)
    rols: RolsEntity[];
  
}