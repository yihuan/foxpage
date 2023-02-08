import { ApplicationService } from './application-service';
import { AuthService } from './authorization-service';
import { ComponentService } from './component-service';
import { ContentLogService } from './content-log-service';
import * as content from './content-services';
import * as file from './file-services';
import * as folder from './folder-services';
import { LogService } from './log-service';
import { OrgService } from './organization-service';
import { RelationService } from './relation-service';
import { ResourceService } from './resource-service';
import * as store from './store-services';
import { TeamService } from './team-service';
import { UserService } from './user-service';
import * as version from './version-services';

const application = ApplicationService.getInstance();
const user = UserService.getInstance();
const org: OrgService = OrgService.getInstance();
const team: TeamService = TeamService.getInstance();
const log = LogService.getInstance();
const contentLog = ContentLogService.getInstance();
const relation: RelationService = RelationService.getInstance();
const auth: AuthService = AuthService.getInstance();
const component: ComponentService = ComponentService.getInstance();
const resource: ResourceService = ResourceService.getInstance();

export {
  application,
  auth,
  component,
  content,
  contentLog,
  file,
  folder,
  log,
  org,
  relation,
  resource,
  store,
  team,
  user,
  version,
};
