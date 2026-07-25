import { CreateUserResponseDto } from '@/modules/users/application/dto/create-user/create-user-response.dto';

export interface RegisterResponseDto {
  user: CreateUserResponseDto;
  accessToken: string;
}
