import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1609475474076 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        isNullable: false,
                        precision: 10,
                        scale: 2,
                    },
                    {
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
				    },
				    {
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
				    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('transactions');
    }

}
