import { PizzaController } from './pizza.controller';

import { Router } from "express";

export class PizzaRouter {

  static get routes(): Router {
    const router = Router()

    router.route('/')
      .get(PizzaController.findAllPizzas)
      .post(PizzaController.createPizza)

    router.route('/:id')
      .get(PizzaController.findOnePizza)
      .patch(PizzaController.updatePizza)
      .delete(PizzaController.deletePizza)

    return router;

  }

}