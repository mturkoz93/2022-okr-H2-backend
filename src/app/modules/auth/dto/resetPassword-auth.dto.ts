import { PartialType } from '@nestjs/mapped-types';
import { LoginDTO } from './login.dto';

export class ResetPasswordAuthDto extends PartialType(LoginDTO) {}
