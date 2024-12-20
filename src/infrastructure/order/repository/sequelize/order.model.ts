import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { OrderItemModel } from "./orderItem.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel, { foreignKey: 'order_id' })
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}
