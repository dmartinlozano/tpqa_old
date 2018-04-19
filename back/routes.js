import { Router } from 'express';
import NodesHierarchy from './api/nodes_hierarchy';
import TestProject from './api/test-project';

const routes = new Router();
routes.get('/', NodesHierarchy.ok);
routes.get('/testspecifications/:testProject', NodesHierarchy.getTree);
routes.get('/testprojects', TestProject.list);

export default routes;
