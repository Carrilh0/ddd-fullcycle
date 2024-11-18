import { Customer } from "../entity/customer"
import { Order } from "../entity/order"
import { OrderItem } from "../entity/orderItem"
import { OrderService } from "./order.service"

describe("Order service unit tests", () => {

  it("should place an order", () => {
    const customer = new Customer("1","Customer 1")
    const item1 = new OrderItem("1", "Item 1", 100, "p1", 2)
    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(100)
    expect(order.total()).toBe(200)
  }) 
  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "p1", 2)
    const item2 = new OrderItem("2", "Item 2", 400, "p2", 2)
  
    const order1 = new Order("1","1",[item1])
    const order2 = new Order("1","1",[item2])

    const total = OrderService.total([order1, order2])

    expect(total).toBe(1000)
  })

})