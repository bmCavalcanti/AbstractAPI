import { Router } from "express";
import { firstController } from "../app/controller/FirstController";
import { clientController } from "../app/controller/ClientController";
import { userController } from "../app/controller/UserController";

const router: Router = Router();

//Routes
router.get("/", firstController.index);

// Cliente
router.get("/client", clientController.list.bind(clientController));
router.post("/client", clientController.create.bind(clientController));
router.put("/client/:id", clientController.update.bind(clientController));
router.get("/client/:id", clientController.get.bind(clientController));
router.delete("/client/:id", clientController.delete.bind(clientController));

// Usuario
router.get("/user", userController.list.bind(userController));
router.post("/user", userController.create.bind(userController));
router.put("/user/:id", userController.update.bind(userController));
router.get("/user/:id", userController.get.bind(userController));
router.delete("/user/:id", userController.delete.bind(userController));

export { router };