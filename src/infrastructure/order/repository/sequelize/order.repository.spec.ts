import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/orderItem";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/valueObjects/address";
import { Product } from "../../../../domain/product/entity/Product";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { ProductModel } from "../../../product/repository/sequelize/product.model";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import { OrderModel } from "./order.model";
import { OrderRepository } from "./order.repository";
import { OrderItemModel } from "./orderItem.model";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync()
  })
  
  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update a order", async() => {
    const orderRepository = new OrderRepository();
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);

    const order = new Order("1","1",[orderItem])
    await orderRepository.create(order)

    const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 2);
    order.addOrderItem(orderItem2)
    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({where: {id:"1"}, include: ["items"]})
    console.log(orderModel.toJSON())

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [{
        id: "1",
        name: product.name,
        price: product.price,
        order_id: order.id,
        product_id: product.id,
        quantity: 2,
      },
      {
        id: "2",
        name: product.name,
        price: product.price,
        order_id: order.id,
        product_id: product.id,
        quantity: 2,
      }]
    })
  })

  it("should find a order", async () => {
    const orderRepository = new OrderRepository();
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1",product.name, product.price, product.id, 2);
    const order = new Order("1","1",[orderItem])

    await orderRepository.create(order)

    const orderResult = await orderRepository.find("1")

    expect(order).toStrictEqual(orderResult);
  });

  it("should find all orders", async () => {
    const orderRepository = new OrderRepository();
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem1 = new OrderItem("1", product.name, product.price, product.id, 2);
    const order1 = new Order("1","1",[orderItem1])
    await orderRepository.create(order1)
    
    const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 2);
    const order2 = new Order("2","1",[orderItem2])
    await orderRepository.create(order2)

    const orders = [order1, order2]

    const modelOrders = await orderRepository.findAll()
    expect(modelOrders).toEqual(orders)
  })
})
