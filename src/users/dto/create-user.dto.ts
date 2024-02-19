import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Mayur', type: String })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Thosar', type: String })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'mayurv.th@gmail.com', type: String })
  email: string;

  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/, {
    message:
      'Password must of 8 characters in length and should contain 1 Uppercase, 1 lowercase, 1 number and 1 special character',
  })
  @IsNotEmpty()
  @ApiProperty({ example: '**********', type: String })
  password: string;

  refreshToken?: string;
}
