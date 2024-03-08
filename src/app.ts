import { express, Request, Response, NextFunction } from "express";
import { router } from "./routes/router";

export class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.auth();
        this.router();
    }

    private middleware() {
        this.server.use(express.json());
    }

    private router() {
        this.server.use(router);
    }

    private auth() {
        this.server.use((req: Request, res: Response, next: NextFunction) => {

            if (req.headers.token === "TOKENTESTE") { // add validação real
                return next();
            }

            res.status(403).end("Invalid Token");

        });
    }
}
