import { Permission } from '../entities/permission.entity';

interface UserInfo {
  id: number;
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  phoneNumber: string;
  isAdmin: boolean;
  isFrozen: boolean;
  createTime: number;
  roles: string[];
  permissions: Permission[];
}

export class LoginUserVo {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}