import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  constructor(name: string, email: string, phone: string, address: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
