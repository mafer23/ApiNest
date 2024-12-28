import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RolsEntity } from './rols.entity';

@Entity({ name: 'permits' })
export class PermitsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    status: boolean;

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

    @ManyToMany(() => RolsEntity, (rol) => rol.permisos) // Cambié 'permiso' por 'permisos'
    rols: RolsEntity[];
}
