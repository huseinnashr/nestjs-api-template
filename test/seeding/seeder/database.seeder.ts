import { Seeder } from '../core';
import { Connection } from 'typeorm';
import { EmployeeFactory, ProjectFactory } from '../factory';
import { Role } from '../../../src/database/enum';
import {
  EmployeeRepository,
  ProjectRepository,
} from '../../../src/database/repository';

export class DatabaseSeeder extends Seeder {
  protected async _run(c: Connection): Promise<void> {
    const empFactory = new EmployeeFactory();
    const proFactory = new ProjectFactory();

    const empRepo = c.getCustomRepository(EmployeeRepository);
    const proRepo = c.getCustomRepository(ProjectRepository);

    const admin = empFactory.makeOne({
      username: 'admin',
      role: Role.ADMIN,
    });
    await empRepo.save(admin);

    const managers = empFactory.makeMany(3, { role: Role.MANAGER });
    await empRepo.save(managers);

    const staffs = empFactory.makeMany(10, { role: Role.STAFF });
    await empRepo.save(staffs);

    const projects = proFactory.makeMany(10, { managerPool: managers });
    await proRepo.save(projects);
  }
}
