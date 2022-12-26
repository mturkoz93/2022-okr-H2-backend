import { ApiProperty } from '@nestjs/swagger';
export class SignupDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
