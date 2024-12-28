import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RolaPermitsCreateTable1735053916074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         // Crear la tabla intermedia 'rols_permits' para la relación ManyToMany entre RolsEntity y PermitsEntity
         await queryRunner.createTable(
            new Table({
                name: 'rols_permits',
                columns: [
                    {
                        name: 'rol_id',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'permit_id',
                        type: 'int',
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        // Añadir llaves foráneas a la tabla intermedia 'rols_permits'
        await queryRunner.createForeignKeys('rols_permits', [
            new TableForeignKey({
                columnNames: ['rol_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'rols',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['permit_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permits',
                onDelete: 'CASCADE',
            }),
        ]);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
   
          // Eliminar las claves foráneas de la tabla intermedia 'rols_permits'
          await queryRunner.dropForeignKey('rols_permits', 'FK_rol_id');
          await queryRunner.dropForeignKey('rols_permits', 'FK_permit_id');
  
          // Eliminar la tabla intermedia 'rols_permits'
          await queryRunner.dropTable('rols_permits');
    }

}
