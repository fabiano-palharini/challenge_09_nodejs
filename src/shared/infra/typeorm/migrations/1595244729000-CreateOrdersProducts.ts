import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOrdersProducts1595244729000
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'numeric(15,4)',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'integer',
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
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'fk_OrdersOrdersProducts',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'fk_ProductsOrdersProducts',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders_products');
  }
}
