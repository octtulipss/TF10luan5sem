import { Router } from 'express';

import JsonHelloController from '../app/Http/Controllers/JsonHelloController.js';
import WebhookHelloController from '../app/Http/Controllers/WebhookController.js';

export default (function () {

    const router = Router();

    router.post('/webhook', WebhookHelloController);

    router.get('/', JsonHelloController);




    return router;

})();
