import { Router } from 'express';
import NodesHierarchy from './api/nodes_hierarchy';

const routes = new Router();
routes.get('/', NodesHierarchy.ok);
routes.get('/tree/:testProject', NodesHierarchy.getTree)

export default routes;
