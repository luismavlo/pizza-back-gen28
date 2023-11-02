import { PizzaRouter } from './../modules/pizza/pizza.route';

import { Router } from "express";

export class AppRoutes {

  static get routes(): Router {

    const router = Router()

    router.use('/pizza', PizzaRouter.routes )

    return router
  }

}