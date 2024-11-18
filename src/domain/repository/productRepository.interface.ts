import { Product } from "../entity/Product";
import { RepositoryInterface } from "./repositoryInterface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {
  
}