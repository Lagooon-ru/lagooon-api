import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPassDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}
