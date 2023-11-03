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

  test("should return a new pizza, POST /api/v1/pizza", async() => {

    const { body } = await request( testServer.app )
      .post('/api/v1/pizza')
      .send( pizza1 )
      .expect( 201 )

    expect( body ).toEqual({
      id: expect.any( Number ),
      name: pizza1.name,
      description: pizza1.description,
      price: pizza1.price,
      size: pizza1.size
    })

  });

  test('should return an error if name is empty, POST /api/v1/pizza', async() => {
    const { body } = await request( testServer.app )
    .post('/api/v1/pizza')
    .send({
      description: "Fresh tomatoes, mozzarella chese and basil leaves an a crispy base of flatbread",
      price: 13,
      size: "MEDIANO"
    })
    .expect( 422 )


    expect( body ).toEqual({
      status: 'error',
      message: 'name is required'
    })
  })

  test("should return an error if name less than three characters", async() => {
    const { body } = await request( testServer.app )
    .post('/api/v1/pizza')
    .send({
      name: "hs",
      description: "Fresh tomatoes, mozzarella chese and basil leaves an a crispy base of flatbread",
      price: 13,
      size: "MEDIANO"
    })
    .expect( 422 )


    expect( body ).toEqual({
      status: 'error',
      message: 'Name must be more than three characters.'
    })
  })

  test('should return aun updated PIZZA, patch /api/v1/pizza', async() => {

    const pizza = await prisma.pizza.create({ data: pizza1 })

    const { body } = await request( testServer.app)
      .patch(`/api/v1/pizza/${ pizza.id }`)
      .send({
        name: "Margherita updated",
        description: "Fresh tomatoes, mozzarella chese and basil leaves an a crispy base of flatbread",
        price: 10,
        size: "GRANDE"
      })
      .expect( 200 )


    expect( body ).toEqual({
      id: pizza.id,
      name: "Margherita updated",
      description: "Fresh tomatoes, mozzarella chese and basil leaves an a crispy base of flatbread",
      price: 10,
      size: "GRANDE"
    })

  })

  test('should return 404 if PIZZA not found, patch /api/v1/pizza', async() => {
    const { body } = await request( testServer.app)
      .patch(`/api/v1/pizza/99999`)
      .send({
        name: "Margherita updated",
        description: "Fresh tomatoes, mozzarella chese and basil leaves an a crispy base of flatbread",
        price: 10,
        size: "GRANDE"
      })
      .expect( 404 )

    expect( body ).toEqual({ message: 'pizza not found' })
  })

  test('should delete a PIZZA, delete /api/v1/pizza/:id', async() => {

    const pizza = await prisma.pizza.create({ data: pizza1 })

    const { body } = await request(testServer.app)
      .delete(`/api/v1/pizza/${ pizza.id }`)
      .expect( 204 )

    expect( body ).toEqual({})
  })

  test('should return 404 if PIZZA not found, delete /api/v1/pizza/:id', async() => {
    const { body } = await request(testServer.app)
      .delete(`/api/v1/pizza/123123`)
      .expect( 404 )

    expect( body ).toEqual({ message: 'pizza not found' })
  })

})