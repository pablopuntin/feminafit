
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./user";

@Entity({ name: "credentials" })
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.credential)
  user: User;
}
