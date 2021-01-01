import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1609467759341 implements MigrationInterface {
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
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'category_id',
                        type: 'varchar',
                        isNullable: false,
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
