import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({
    comment: '用户id',
  })
  id: number;

  @Column({
    comment: '用户名',
    length: 50,
  })
  username: string;

  @Column({
    comment: '密码',
    length: 50,
  })
  password: string;

  @Column({
    comment: '昵称',
    length: 50,
    name: 'nick_name',
  })
  nickName: string;

  @Column({
    comment: '邮箱',
    length: 50,
  })
  email: string;

  @Column({
    comment: '头像',
    length: 100,
    nullable: true,
    name:'head_pic'
  })
  headPic: string;

  @Column({
    comment: '手机号',
    length: 20,
    nullable: true,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    comment: '是否被冻结',
    default: false,
    name: 'is_frozen',
  })
  isFrozen: boolean;

  @Column({
    comment: '是否是管理员',
    default: false,
    name: 'is_admin',
  })
  isAdmin: boolean;

  @CreateDateColumn({
    comment: '创建时间',
    name:'create_time'
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
    name:'update_time'
  })
  updateTime: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
  })
  roles: Role[];
}
