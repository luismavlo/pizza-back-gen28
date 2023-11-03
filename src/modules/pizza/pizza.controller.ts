import { PizzaService } from './pizza.service';
import { Request, Response } from "express";

export class PizzaController {

  static findAllPizzas = async(req: Request, res: Response) => {
    try {

      const pizzas = await PizzaService.findAll()
    
      return res.json(pizzas)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static createPizza = async(req: Request, res: Response) => {
    const { name, description, price, size } = req.body;

    if(!name){
      return res.status(422).json({
        status: 'error',
        message: 'name is required'
      })
    }

    if(name.length <= 3){
      return res.status(422).json({
        status: 'error',
        message: 'Name must be more than three characters.'
      })
    }

    try {
      const pizza = await PizzaService.create({ name, description, price, size })

      return res.status(201).json(pizza)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  static findOnePizza = async(req: Request, res: Response) => {
    const id = +req.params.id;

    if(!id ||  isNaN(Number(id))){
      return res.status(400).json({ message: 'Invalid ID' })
    }

    try {
      const pizza = await PizzaService.findById(id)

      return res.json(pizza)
    } catch (error: any) {
      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  }

  static updatePizza = async(req: Request, res: Response) => {
    const id = +req.params.id;
    const { name, description, price, size } = req.body;

    if(!id ||  isNaN(Number(id))){
      return res.status(400).json({ message: 'Invalid ID' })
    }

    try {
      const updatedPizza = await PizzaService.update(id, { name, description, price, size });

      return res.status(200).json(updatedPizza)
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message })
    }

  }

  static deletePizza = async(req: Request, res: Response) => {
    const id = +req.params.id;

    if(!id ||  isNaN(Number(id))){
      return res.status(400).json({ message: 'Invalid ID' })
    }

    try {
      await PizzaService.delete(id)

      return res.status(204).json(null)
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message })
    }
  }

}