import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    // query if any user with that email already exists in database
    const customerExist = await this.customersRepository.findByEmail(email);

    if (customerExist) {
      throw new AppError('Customer already exists.');
    }

    // saves user in database
    const customer = this.customersRepository.create({ name, email });

    return customer;
  }
}

export default CreateCustomerService;
