import { prisma } from './../../data/postgres/index';
import { Pizza } from './pizza.interfaces'

export class PizzaService {

  static async findAll(){
    return await prisma.pizza.findMany()
  }

  static async findById(id: number){
    const pizza = await prisma.pizza.findUnique({
      where: {
        id
      }
    })

    if(!pizza) throw { status: 404, message: 'pizza not found'}

    return pizza
  }

  static async create(pizza: Pizza){
    return await prisma.pizza.create({
      data: pizza
    })
  }

  static async update(id: number, data: Pizza){
    await this.findById(id)

    const updatedPizza = await prisma.pizza.update({
      where: {  id: id },
      data: data
    })

    return updatedPizza
  }

  static async delete(id: number){
    await this.findById(id)

    await prisma.pizza.delete({ 
      where: { id: id }
    })
  }

}