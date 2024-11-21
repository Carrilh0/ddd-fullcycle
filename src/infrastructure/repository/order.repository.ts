import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/orderItem";
import { OrderModel } from "../db/sequelize/model/order.model";
import { OrderItemModel } from "../db/sequelize/model/orderItem.model";

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      }))
    }, {
      include: [{ model: OrderItemModel }]
    })
  }

  async update(entity: Order): Promise<void> {
    OrderModel.update({
      items: entity.items,
      customer_id: entity.customerId,
      total: entity.total()
    }, {
      where: { id: entity.id}
    })
  }

  async find(id: string): Promise<Order> {
    let order;

    try {
      order = await OrderModel.findOne({
        where: {id}, 
        include: ["items"]
      })

      console.log(order.items)
    } catch (error) {
      throw new Error("Order not found")
    }

    const orderItems = order.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    })

    return new Order(order.id, order.customer_id, orderItems)
  }
  
  async findAll(): Promise<Order[]> {
    return
  }
}