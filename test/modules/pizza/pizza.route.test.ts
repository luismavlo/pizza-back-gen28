import { Pizza } from './../../../src/modules/pizza/pizza.interfaces';
import { testServer } from './../../test-server';
import { prisma } from "../../../src/data/postgres";

import request from "supertest"

describe("Pizza route testing", () => {

  beforeAll(async() => {
    await testServer.start();
  })

  afterAll(() => {
    testServer.close();
  })

  beforeEach(async() => {
    await prisma.pizza.deleteMany()
  })

  const pizza1: Pizza = {
    name: "Margherita",
    description: "Fresh tomatoes, mozzarella chese and basil leaves an a crispy base of flatbread",
    price: 10,
    size: "GRANDE"
  }

  const pizza2: Pizza = {
    name: "Napolitana",
    description: "Fresh tomatoes, mozzarella chese and basil leaves an a crispy base of flatbread",
    price: 13,
    size: "MEDIANO"
  }

  test("should return pizzas, GET /api/v1/pizza", async() => {

    await prisma.pizza.createMany({
      data: [pizza1, pizza2]
    })

    const { body } = await request(testServer.app)
      .get('/api/v1/pizza')
      .expect(200)

    expect( body ).toBeInstanceOf( Array )
    expect( body.length ).toBe( 2 )
    expect( body[0].name ).toBe( pizza1.name )
    expect( body[0].description ).toBe( pizza1.description )
    expect( body[1].name ).toBe( pizza2.name )
   
  })

  test('should return one pizza by id GET /api/v1/pizza/:id', async() => {
    
    const pizza = await prisma.pizza.create({ data: pizza1 });

    const { body } = await request( testServer.app )
      .get(`/api/v1/pizza/${ pizza.id }`)
      .expect( 200 );

    expect( body ).toEqual({
      id: pizza.id,
      name: pizza.name,
      description: pizza.description,
      price: pizza.price,
      size: pizza.size
    })
  })

  test('should return 404 NotFound, GET /api/v1/pizza/:id', async() => {

    const { body } = await request( testServer.app )
      .get(`/api/v1/pizza/560`)
      .expect( 404 );
    
    expect( body ).toEqual({ message: 'pizza not found' })
  })

  test('should return 400 badRequest GET /api/v1/pizza/anystring', async() => {

  })

})