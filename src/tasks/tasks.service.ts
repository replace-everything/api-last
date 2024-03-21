import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto); // This creates a new task instance and copies all dto properties to it.
    return this.tasksRepository.save(task); // This saves the new task to the database.
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(tid: number): Promise<Task> {
    return this.tasksRepository.findOne({
      where: { tid },
    });
  }

  async findByTjid(tjid: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { tjid } });
  }

  async findByTwoid(twoid: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { twoid } });
  }

  async findByTuid(tuid: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { tuid } });
  }

  async findByTassuid(tassuid: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { tassuid } });
  }

  async findAllForUserToday(userId: number): Promise<Task[]> {
    const today = new Date().toISOString().substring(0, 10); // Convert today's date to 'YYYY-MM-DD'

    const tasks = await this.tasksRepository.find({
      where: {
        tuid: userId,
        tdts: today,
      },
    });

    return tasks;
  }
}
