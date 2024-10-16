import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(
    email: string,
    password: string,
    name: string,
    gender: 'male' | 'female' | 'other',
    image?: string,
  ): Promise<User> {
    const user = this.userRepository.create({
      email,
      password,
      name,
      gender,
      image,
    });
    return this.userRepository.save(user);
  }
}
