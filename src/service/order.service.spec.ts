import { Order } from "../entity/order"
import { OrderItem } from "../entity/orderItem"
import { OrderService } from "./order.service"

describe("Order service unit tests", () => {
  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "p1", 2)
    const item2 = new OrderItem("2", "Item 2", 400, "p2", 2)
  
    const order1 = new Order("1","1",[item1])
    const order2 = new Order("1","1",[item2])

    const total = OrderService.total([order1, order2])

    expect(total).toBe(1000)
  })

})