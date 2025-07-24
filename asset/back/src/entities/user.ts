
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Credential } from "./credential";
import { Appointment } from "./appoinment";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 70 })
  email: string;

  @Column()
  birthdate: string;

  @Column()
  nDni: number;

  @OneToOne(() => Credential, (credential) => credential.user, { cascade: true })
  @JoinColumn({ name: "credential_id" }) // Esto genera la FK en la tabla `users`
  credential: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
