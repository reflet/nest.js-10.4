import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
  name?: string;
  email?: string;
  age?: number;
}
