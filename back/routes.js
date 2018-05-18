import { Router } from 'express';
import Login from './api/login';
import NodesHierarchy from './api/nodes_hierarchy';
import TestProject from './api/test-project';
import TestSuite from './api/test-suite';
import TestCase from './api/test-case';
import Attachments from './api/attachments';

const routes = new Router();
routes.get('/', NodesHierarchy.ok);
routes.post('/login', Login.login);
routes.get('/testspecifications/:testProjectId', NodesHierarchy.getTree);
routes.get('/testprojects', TestProject.list);
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
