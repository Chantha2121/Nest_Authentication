import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}
    async register(name: string, email: string, password: string){
        const exitEmail = await this.userRepository.findOne({where: {email}})
        if(exitEmail){
            throw new Error("User already registered")
        }
        const salt = await bcrypt.getSalt();
        const hashpassword = await bcrypt.hashpassword(password, salt);
        const newUser = this.userRepository.create({
            username: name,
            password: hashpassword,
            email: email
        })
        return this.userRepository.save(newUser);
    }
}
