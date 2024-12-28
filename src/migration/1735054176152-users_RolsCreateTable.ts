import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UsersRolsCreateTable1735054176152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

         // Crear la tabla intermedia 'users_rols' para la relación ManyToMany entre UsersEntity y RolsEntity
         await queryRunner.createTable(
            new Table({
                name: 'users_rols',
                columns: [
                    {
                        name: 'user_id',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'rol_id',
                        type: 'int',
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        // Añadir llaves foráneas a la tabla intermedia 'users_rols'
        await queryRunner.createForeignKeys('users_rols', [
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['rol_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'rols',
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_rols', 'FK_user_id');
        await queryRunner.dropForeignKey('users_rols', 'FK_rol_id');

        // Eliminar la tabla intermedia 'users_rols'
        await queryRunner.dropTable('users_rols');
    }

}
