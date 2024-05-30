import { Permission } from '../entities/permission.entity';
import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  nickName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  headPic: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  isAdmin: boolean;
  @ApiProperty()
  isFrozen: boolean;
  @ApiProperty()
  createTime: number;
  @ApiProperty()
  roles: string[];
  @ApiProperty()
  permissions: Permission[];
}

export class LoginUserVo {
  @ApiProperty()
  userInfo: UserInfo;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
