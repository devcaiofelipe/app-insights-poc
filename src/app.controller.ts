import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Controller('users')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  @Get()
  async get(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  @Post()
  async create(@Req() req): Promise<User> {
    const user = new this.userModel(
      req.body
    )
    return await user.save(); 
  }

  @Patch()
  async update(@Req() req): Promise<Partial<User>> {
    return await this.userModel.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, age: req.body.age }, { new: true });
  }

  @Delete()
  async delete(@Req() req): Promise<any> {
    return await this.userModel.deleteOne({ _id: req.body._id });
  }
}
