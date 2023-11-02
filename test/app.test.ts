import { Server } from './../src/server';
import { envs } from './../src/config/envs'

jest.mock('../src/server.ts')

describe("Testing App.ts", () => {
  
  test("should call server with arguments and start", async() => {
    await import('./../src/app')
    
    expect( Server ).toHaveBeenCalledTimes( 1 );
    expect( Server ).toHaveBeenCalledWith({ port: envs.PORT })
    expect( Server.prototype.start ).toHaveBeenCalled()

  })

})