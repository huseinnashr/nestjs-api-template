import { INestApplication } from '@nestjs/common';
import { ProjectRepository } from '../../src/database/repository';
import { EmployeeEntity, ProjectEntity } from '../../src/database/entity';
import { ProjectStatus, Role } from '../../src/database/enum';
import { AuthHelper } from './auth.helper';

class RepoHelper {
  private proRepo: ProjectRepository;
  private auth: AuthHelper;

  constructor(app: INestApplication, auth: AuthHelper) {
    this.proRepo = app.get(ProjectRepository);
    this.auth = auth;
  }

  async createAProject(manager?: EmployeeEntity): Promise<ProjectEntity> {
    if (!manager) manager = (await this.auth.signUp({ role: Role.MANAGER }))[1];
    return await this.proRepo.save(
      this.proRepo.create({
        title: 'Project',
        body: 'project body',
        status: ProjectStatus.IN_PROGRESS,
        manager: manager,
      }),
    );
  }
}

export { RepoHelper };
