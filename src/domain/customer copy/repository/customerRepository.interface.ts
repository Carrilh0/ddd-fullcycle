import { RepositoryInterface } from "../../@shared/repository/repositoryInterface";
import { Customer } from "../../customer/entity/customer";

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {
  
}