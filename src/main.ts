import { Address } from "./domain/entity/address"
import { Customer } from "./domain/entity/customer"
import { Order } from "./domain/entity/order"
import { OrderItem } from "./domain/entity/orderItem"



// Agregado Customer
// Relação ID
let customer = new Customer("123", "Vitor Carrilho")
let address = new Address("2Tv Domingo Rabelo", 169, "40421-700", "Salvador")
customer.Address = address
customer.activate()

// Agregado Order
// Relação Objeto/Entidade
let item1 = new OrderItem("1", "Notebook", 4000, "p1", 1)
let item2 = new OrderItem("2", "Monitor", 1000, "p2", 1)

let order = new Order("1", "1", [item1, item2])