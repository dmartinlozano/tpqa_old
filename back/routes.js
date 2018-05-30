import { Router } from 'express';
import User from './api/user';
import NodesHierarchy from './api/nodes_hierarchy';
import TestProject from './api/test-project';
import TestSuite from './api/test-suite';
import TestCase from './api/test-case';
import Attachments from './api/attachments';
import AuthMiddleware from './middleware/auth.js';

const routes = new Router();
routes.get('/', NodesHierarchy.ok);
routes.post('/login', User.login);
routes.post('/rights', User.rights);
routes.get('/testspecifications/:testProjectId', AuthMiddleware.permissions("NO_CHECK"), NodesHierarchy.getTree);
routes.get('/testprojects', AuthMiddleware.permissions("NO_CHECK"), TestProject.listWithPermissions);
routes.get('/testprojects/:testProjectId', TestProject.details);
routes.get('/testsuites/:testSuiteId', TestSuite.details);
routes.get('/attachments/:id', Attachments.list);
routes.get('/testsuites/:testSuiteId/keywords', TestSuite.keywords);
routes.get('/testcases/:testCaseId/versions', TestCase.versions);
routes.get('/testcases/:testCaseId/versions/:testCaseVersionId', TestCase.details);
routes.get('/testcases/:testCaseId/versions/:testCaseVersionId/steps', TestCase.steps);
routes.get('/testcases/:testCaseId/keywords', TestCase.keywords);
routes.get('/testcases/:testCaseId/requirements', TestCase.requirements);
routes.get('/testcases/:testCaseId/related', TestCase.related);

export default routes;
