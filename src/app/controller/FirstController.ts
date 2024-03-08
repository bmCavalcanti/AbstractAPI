import { Request, Response } from "express";

class FirstController {

    public index(req:Request, res:Response) {
        return res.json({
            response: 'Hello World'
        });
    }
}

export const firstController = new FirstController();
