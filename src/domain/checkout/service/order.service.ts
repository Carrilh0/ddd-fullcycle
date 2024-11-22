import { v4 as uuid } from "uuid";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/orderItem";
import { Customer } from "../../customer/entity/customer";

export class OrderService {
  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    if(orderItems.length === 0) {
      throw new Error("Order must have at least one item")
    }

    const order = new Order(uuid(), customer.id, orderItems)
    customer.addRewardPoints(order.total()/2)
    return order
  }

  static total(orders: Order[]) {
    return orders.reduce((acc, order) => acc + order.total(), 0) 
  }
}