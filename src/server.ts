import { AppRoutes } from './router/routes';

import express, { Request, Response } from 'express';

interface Options {
  port: number;
}

export class Server {

  public readonly app = express()
  private readonly port: number;
  private serverListener?: any;

  constructor(options: Options){
    const { port } = options;

    this.port = port;
  }

  async start(){

    //middlewares
    this.app.use( express.json() )
    this.app.use( express.urlencoded({ extended: true }))

    //routes
    this.app.use('/api/v1', AppRoutes.routes )

    this.app.all('*', (req: Request, res: Response) => {
      return res.status(400).json({
        status: 'error',
        message: `Can'f find ${req.originalUrl} on this server`
      })
    })

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`)
    })

  }

  public close(){
    this.serverListener?.close()
  }

}