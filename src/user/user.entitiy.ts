import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/report/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user) // @OneToMay = Dose not change TABLE
  reports: Report[]; // reports tied to this user will be accessed with : user.reports
  // Association is not automatically fetched when we fetch a User

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id {%d}', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id {%d}', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id {%d}', this.id);
  }
}
