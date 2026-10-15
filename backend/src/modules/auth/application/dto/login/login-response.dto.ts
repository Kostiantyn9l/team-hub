import { UserResponseDto } from '@/modules/users/application/dto/user-response.dto';

export interface LoginResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
}
