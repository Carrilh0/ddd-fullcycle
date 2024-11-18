import { Address } from "./address";
import { Customer } from "./customer";

describe("Customer unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Vitor")
    }).toThrow("Id is required")
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "")
    }).toThrow("Name is required")
  })

  it("should change name", () => {
    //Arrange
    const customer = new Customer("123", "Vitor")
    //Act
    customer.changeName("Carrilho")
    //Assert
    expect(customer.name).toBe("Carrilho")
  })

  it("should activate customer", () => {
    const customer = new Customer("1", "Vitor")
    const address = new Address("Street 1", 123, '40421-700', "Salvador")
    customer.Address = address;
    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it("should throw error when addres is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Vitor")
      customer.activate()
    }).toThrow("Address is mandatory to activate a customer")
  })

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Vitor")

    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1")
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
});