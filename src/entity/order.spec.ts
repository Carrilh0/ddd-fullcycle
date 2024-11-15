import { Order } from "./order";
import { OrderItem } from "./orderItem";

describe("Order unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("","123",[])
    }).toThrow("Id is required")
  })

  it("should throw error when CustomerId is empty", () => {
    expect(() => {
      let order = new Order("123","",[])
    }).toThrow("CustomerId is required")
  })

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("123","123",[])
    }).toThrow("Items are required")
  })

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 100)
    const item2 = new OrderItem("2", "Item 2", 400)
    const item3 = new OrderItem("3", "Item 3", 200)
    let order = new Order("123","123",[item1,item2,item3])
    const total = order.total()
    
    expect(total).toBe(700)
  })
});