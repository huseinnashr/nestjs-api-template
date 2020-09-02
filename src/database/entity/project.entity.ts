import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProjectStatus } from '../enum/project-status.enum';
import { EmployeeEntity } from './employee.entity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  status: ProjectStatus;

  @ManyToOne(
    () => EmployeeEntity,
    employee => employee.managedProject,
    { eager: true, onDelete: 'CASCADE' },
  )
  manager: EmployeeEntity;

  isManager(employee: EmployeeEntity): boolean {
    return this.manager.id === employee.id;
  }
}
