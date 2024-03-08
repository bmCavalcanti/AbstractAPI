import { User } from "../entity/User";
import { AbstractController } from "./AbstractController";

class UserController extends AbstractController {

    constructor(entityClass: any) {
        super(entityClass);
    }
}

export const userController = new UserController(User);
