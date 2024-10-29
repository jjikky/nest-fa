import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
