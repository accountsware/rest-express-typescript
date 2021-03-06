import { Router, Request, Response } from 'express';
import Config from './../Config';
import enhancedRouter from './../enhancedRouter';
import getPosts from './getPosts';
import getPostById from './getPostById';


export default (config: Config, router: any): Router => {
    // const router: Router = enhancedRouter(config);
    router.get('/', getPosts(config));
    router.get('/:post_id', getPostById(config));


    return router;
}
