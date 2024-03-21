import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksService } from './tasks.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: Task,
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.create(createTaskDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({ status: 200, description: 'An array of tasks', type: [Task] })
  async findAll() {
    try {
      return await this.tasksService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':tid')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'tid', type: 'number', description: 'The ID of the task' })
  @ApiResponse({ status: 200, description: 'The task object', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findOne(@Param('tid') tid: string) {
    try {
      return await this.tasksService.findOne(+tid);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch task by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('job/:tjid')
  @ApiOperation({ summary: 'Find tasks by associated job ID' })
  @ApiParam({ name: 'tjid', type: 'number', description: 'The job ID' })
  @ApiResponse({ status: 200, description: 'An array of tasks', type: [Task] })
  @ApiResponse({ status: 404, description: 'Tasks for job not found' })
  async findByTjid(@Param('tjid') tjid: string) {
    try {
      return await this.tasksService.findByTjid(+tjid);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch tasks by job ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('order/:twoid')
  @ApiOperation({ summary: 'Find tasks by associated order ID' })
  @ApiParam({ name: 'twoid', type: 'number', description: 'The order ID' })
  @ApiResponse({ status: 200, description: 'An array of tasks', type: [Task] })
  @ApiResponse({ status: 404, description: 'Tasks for order not found' })
  async findByTwoid(@Param('twoid') twoid: string) {
    try {
      return await this.tasksService.findByTwoid(+twoid);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch tasks by order ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user/:tuid')
  @ApiOperation({ summary: 'Find tasks assigned to a user' })
  @ApiParam({ name: 'tuid', type: 'number', description: 'The user ID' })
  @ApiResponse({ status: 200, description: 'An array of tasks', type: [Task] })
  @ApiResponse({ status: 404, description: 'Tasks for user not found' })
  async findByTuid(@Param('tuid') tuid: string) {
    try {
      return await this.tasksService.findByTuid(+tuid);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch tasks assigned to user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('assigner/:tassuid')
  @ApiOperation({ summary: 'Find tasks created by a user' })
  @ApiParam({
    name: 'tassuid',
    type: 'number',
    description: 'The user ID of the task assigner',
  })
  @ApiResponse({ status: 200, description: 'An array of tasks', type: [Task] })
  @ApiResponse({ status: 404, description: 'Tasks for the assigner not found' })
  async findByTassuid(@Param('tassuid') tassuid: string) {
    try {
      return await this.tasksService.findByTassuid(+tassuid);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch tasks created by user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/user/:tuid/today')
  @ApiOperation({ summary: 'Find tasks for a user due today' })
  @ApiParam({
    name: 'tuid',
    type: 'number',
    description: 'The user ID',
  })
  @ApiResponse({
    status: 200,
    description: 'An array of tasks due today',
    type: [Task],
  })
  @ApiResponse({
    status: 404,
    description: 'No tasks for the user due today found',
  })
  async findAllForUserToday(@Param('tuid') tuid: number) {
    try {
      return await this.tasksService.findAllForUserToday(tuid);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch tasks for user due today',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
