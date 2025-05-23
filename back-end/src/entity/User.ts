import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username: string;

  @Column()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
