import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @ApiProperty({ example: 'abc@gmail.com', type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'a*******', type: String })
  password: string;
}
