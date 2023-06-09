import { Inject, Injectable, Logger } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions/business.exception.filter';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.mongo.entity';
import { FeishuUserInfo } from './feishu/feishu.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    if (!id) throw new BusinessException('此处应当有id');
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createOrSave(user) {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      Logger.log(JSON.stringify(error));
    }
  }

  async createOrSaveFeishu(user: FeishuUserInfo) {
    try {
      Logger.log('插入userRepository', user);
      return await this.userRepository.save(user);
    } catch (error) {
      Logger.log(JSON.stringify(error));
    }
  }
}
