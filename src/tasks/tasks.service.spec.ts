import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
    repository = module.get(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = { tsummary: 'New Task' };

      const createdTask: Task = { tid: 1, tsummary: 'New Task' };
      jest.spyOn(repository, 'create').mockReturnValue(createdTask);
      jest.spyOn(repository, 'save').mockResolvedValue(createdTask);

      const result = await controller.create(createTaskDto);
      expect(result).toBe(createdTask);
      expect(repository.create).toHaveBeenCalledWith(createTaskDto);
      expect(repository.save).toHaveBeenCalledWith(createdTask);
    });
  });

  describe('GET /tasks', () => {
    it('should return all tasks', async () => {
      const tasks: Task[] = [
        { tid: 1, tsummary: 'Task 1' },
        { tid: 2, tsummary: 'Task 2' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(tasks);

      const result = await controller.findAll();
      expect(result).toBe(tasks);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /tasks/:tid', () => {
    it('should return a task by ID', async () => {
      const taskId = '1';
      const task: Task = { tid: 1, tsummary: 'Task 1' };

      jest.spyOn(service, 'findOne').mockResolvedValue(task);

      const result = await controller.findOne(taskId);
      expect(result).toBe(task);
      expect(service.findOne).toHaveBeenCalledWith(+taskId);
    });
  });

  describe('GET /tasks/job/:tjid', () => {
    it('should return tasks by tjid', async () => {
      const tjid = '1';
      const tasks: Task[] = [
        { tid: 1, tsummary: 'Task 1' },
        { tid: 2, tsummary: 'Task 2' },
      ];

      jest.spyOn(service, 'findByTjid').mockResolvedValue(tasks);

      const result = await controller.findByTjid(tjid);
      expect(result).toBe(tasks);
      expect(service.findByTjid).toHaveBeenCalledWith(+tjid);
    });
  });

  describe('GET /tasks/order/:twoid', () => {
    it('should return tasks by twoid', async () => {
      const twoid = '1';
      const tasks: Task[] = [
        { tid: 1, tsummary: 'Task 1' },
        { tid: 2, tsummary: 'Task 2' },
      ];

      jest.spyOn(service, 'findByTwoid').mockResolvedValue(tasks);

      const result = await controller.findByTwoid(twoid);
      expect(result).toBe(tasks);
      expect(service.findByTwoid).toHaveBeenCalledWith(+twoid);
    });
  });

  describe('GET /tasks/user/:tuid', () => {
    it('should return tasks by tuid', async () => {
      const tuid = '1';
      const tasks: Task[] = [
        { tid: 1, tsummary: 'Task 1' },
        { tid: 2, tsummary: 'Task 2' },
      ];

      jest.spyOn(service, 'findByTuid').mockResolvedValue(tasks);

      const result = await controller.findByTuid(tuid);
      expect(result).toBe(tasks);
      expect(service.findByTuid).toHaveBeenCalledWith(+tuid);
    });
  });

  describe('GET /tasks/assigner/:tassuid', () => {
    it('should return tasks by tassuid', async () => {
      const tassuid = '1';
      const tasks: Task[] = [
        { tid: 1, tsummary: 'Task 1' },
        { tid: 2, tsummary: 'Task 2' },
      ];

      jest.spyOn(service, 'findByTassuid').mockResolvedValue(tasks);

      const result = await controller.findByTassuid(tassuid);
      expect(result).toBe(tasks);
      expect(service.findByTassuid).toHaveBeenCalledWith(+tassuid);
    });
  });

  // Add more describe blocks for other routes in your controller
});
