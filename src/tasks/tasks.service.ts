import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  private filterFormat = (value: string | number) => {
    if (typeof value === 'string' && value.length > 0) {
      const isoDatePattern =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
      if (isoDatePattern.test(value)) {
        return `'${value}'`;
      } else {
        return `'${value.replace(/'/g, "''")}'`;
      }
    }
    if (typeof value === 'number') {
      return value;
    }
    return 'NULL';
  };

  async create(schema: string, createTaskDto: Partial<Task>): Promise<Task> {
    const columns = Object.keys(createTaskDto)
      .map((column) => `\`${column}\``)
      .join(',');
    const values = Object.values(createTaskDto)
      .map(this.filterFormat)
      .join(',');
    try {
      const query = `INSERT INTO ${schema}.PQ_tasks(${columns}) VALUES(${values}) RETURNING *;`;
      const [task] = await this.tasksRepository.manager.query(query);
      return task;
    } catch (error) {
      console.error('Error: ', error);
      throw new NotFoundException('Failed to create task');
    }
  }

  async findAll(schema: string): Promise<Task[]> {
    try {
      const tasks = await this.tasksRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_tasks;`,
      );
      return tasks;
    } catch (error) {
      console.error('Error: ', error);
      throw new NotFoundException('Failed to retrieve all tasks');
    }
  }

  async findOne(schema: string, tid: number): Promise<Task> {
    let tasks: Task[];
    try {
      tasks = await this.tasksRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_tasks WHERE tid = '${tid}';`,
      );
    } catch (error) {
      console.error('Error: ', error);
      throw new NotFoundException('Failed to retrieve tasks by ID');
    }
    if (tasks.length === 0)
      throw new NotFoundException(`Task with ID ${tid} not found`);
    return tasks[0];
  }

  async findByTjid(schema: string, tjid: number): Promise<Task[]> {
    try {
      return await this.tasksRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_tasks WHERE tjid = '${tjid}';`,
      );
    } catch (error) {
      console.error('Error: ', error);
      throw new NotFoundException('Failed to retrieve tasks by job ID');
    }
  }

  async findByTwoid(schema: string, twoid: number): Promise<Task[]> {
    try {
      return await this.tasksRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_tasks WHERE twoid = '${twoid}';`,
      );
    } catch (error) {
      console.error('Error: ', error);
      throw new NotFoundException('Failed to retrieve tasks by work order ID');
    }
  }

  async findByTuid(schema: string, tuid: number): Promise<Task[]> {
    try {
      return await this.tasksRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_tasks WHERE tuid = '${tuid}';`,
      );
    } catch (error) {
      console.error('Error: ', error);
      throw new NotFoundException('Failed to retrieve tasks for user');
    }
  }

  async findByTassuid(schema: string, tassuid: number): Promise<Task[]> {
    try {
      return await this.tasksRepository.manager.query(
        `SELECT * FROM ${schema}.PQ_tasks WHERE tassuid = '${tassuid}';`,
      );
    } catch (error) {
      console.error('Error: ', error);
      throw new NotFoundException('Failed to retrieve tasks for user');
    }
  }

  async findAllForUserToday(schema: string, userId: number): Promise<Task[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
      return await this.tasksRepository.manager.query(
        `SELECT * FROM "${schema}"."PQ_tasks" WHERE tuid = ${userId} AND tdts >= ${today} AND tdts < ${tomorrow}`,
      );
    } catch (error) {
      console.error('Error: ', error);
      throw new NotFoundException('Failed to retrieve tasks for user today');
    }
  }
}
