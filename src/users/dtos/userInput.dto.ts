import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UsersServiceInput {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number = 10;

  @IsOptional()
  @IsNumber()
  page: number = 1;
}
