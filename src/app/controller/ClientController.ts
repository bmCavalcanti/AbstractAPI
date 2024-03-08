import { Client } from "../entity/Client";
import { AbstractController } from "./AbstractController";

class ClientController extends AbstractController {

    constructor(entityClass: any) {
        super(entityClass);
    }
}

export const clientController = new ClientController(Client);
