import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/orderItem";
import { OrderRepositoryInterface } from "../../../../domain/checkout/repository/orderRepository.interface";
import { OrderModel } from "./order.model";
import { OrderItemModel } from "./orderItem.model";

export class OrderRepository implements OrderRepositoryInterface {
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
      where: { id: entity.id },
    })

    await OrderItemModel.destroy({ where: { order_id: entity.id } });

    const itemsData = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id,
    }));

    await OrderItemModel.bulkCreate(itemsData);
  }

  async find(id: string): Promise<Order> {
    let order;

    try {
      order = await OrderModel.findOne({
        where: {id}, 
        include: ["items"]
      })
    } catch (error) {
      throw new Error("Order not found")
    }

    const orderItems = order.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    })

    return new Order(order.id, order.customer_id, orderItems)
  }
  
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: ["items"]
    })

    return orders.map((order) => {
      const orderItems = order.items.map((item) => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      })
      return new Order(order.id, order.customer_id, orderItems)
    })
  }
}