import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

const mockUser: User = {
  id: 'myTestId',
  username: 'ammar_alkhooly',
  password: 'testPassword',
  task: [],
};

const tasks: Task[] = [];

const mockTaskRepository = () => ({
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis().mockResolvedValue(tasks),
  })),
  create: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

const TASK_REPOSITORY_TOKEN = getRepositoryToken(Task);

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TASK_REPOSITORY_TOKEN, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(TASK_REPOSITORY_TOKEN);
  });

  it('Task service should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  it('Task Repository should be defined', () => {
    expect(taskRepository).toBeDefined();
  });
});
