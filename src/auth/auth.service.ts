import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  
  async register(name: string, email: string, password: string) {
    try {
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password); // Check if the password is correctly passed
  
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("User already registered");
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = this.userRepository.create({
        username: name,
        email,
        password: hashedPassword, // Using the hashed password
      });
  
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }
  
  
}
