import { UserResponseDto } from '@/modules/users/application/dto/user-response.dto';

export interface RegisterResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
}
