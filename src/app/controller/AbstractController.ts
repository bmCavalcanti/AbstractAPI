import { Request, Response } from "express";
import { Connection } from "../../database/connection";
import { validate } from "class-validator";

export abstract class AbstractController {

    private entityClass: any;
    private repo: any;

    constructor(entityClass:any) {
        this.entityClass = entityClass;
        this.repo = Connection.getRepository(entityClass);
    }

    public async get(req: Request, res: Response) {
        const id = req.params.id;

        await this.repo.findOneBy({
            id
        }).then((data: any) => {
            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: "Não encontrado.",
                    data
                });
            }

            return res.status(200).json({
                status: true,
                data
            });
        }).catch((error: any) => {
            return res.status(500).json({
                status: false,
                message: "Ocorreu um erro ao tentar listar os dados.",
                error: error.originalError?.info?.message || error.message || "Erro não identificado."
            });
        });

    }

    public async list(req: Request, res: Response) {

        let pageParam = req.query.page ? parseInt(req.query.page.toString()) : 1;

        let perPage = 10, page = pageParam || 1;
        let skip = (perPage * page) - perPage;

        await this.repo.find({
            skip: skip,
            take: perPage
        }).then((data: any) => {
            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: "Nada encontrado",
                    data
                });
            }

            return res.status(200).json({
                status: true,
                data
            });
        }).catch((error: any) => {
            return res.status(500).json({
                status: false,
                message: "Ocorreu um erro ao tentar listar os dados.",
                error: error.originalError?.info?.message || error.message || "Erro não identificado."
            });
        });

    }

    public async create(req: Request, res: Response) {

        const entity = await this.repo.create(req.body);

        const errors = await validate(entity);

        if (errors.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Dados inválidos",
                errors
            });
        }

        await this.repo.save(entity).then((create: any) => {
            if (create.affected == 0) {
                return res.status(400).json({
                    status: false,
                    message: "Ocorreu um erro, nenhum dado foi cadastrado."
                });
            }

            return res.status(200).json({
                status: true,
                message: "Cadastrado com sucesso.",
                data: create
            });

        }).catch((error: any) => {
            return res.status(500).json({
                status: false,
                message: "Ocorreu um erro ao tentar cadastrar.",
                error: error.originalError?.info?.message || error.message || "Erro não identificado."
            });
        });
    }

    public async update(req: Request, res: Response) {

        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Informe o ID."
            });
        }

        const data = await this.repo.findOneBy({
            id
        })

        if (!data) {
            return res.status(200).json({
                status: false,
                message: "Não encontrado.",
                data
            });
        }

        const entity = this.repo.create(req.body);
        const errors = await validate(entity);

        if (errors.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Dados inválidos",
                errors
            });
        }

        await this.repo.update(id, req.body)
        .then((update: any) => {

            if (update.affected == 0) {
                return res.status(400).json({
                    status: false,
                    message: "Ocorreu um erro, nenhum dado foi atualizado."
                });
            }

            return res.status(200).json({
                status: true,
                message: "Atualizado com sucesso."
            });

        }).catch((error: any) => {
            return res.status(500).json({
                status: false,
                message: "Ocorreu um erro ao tentar atualizar.",
                error: error.originalError?.info?.message || error.message || "Erro não identificado."
            });
        });
    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Informe o ID."
            });
        }

        const data = await this.repo.findOneBy({
            id,
        })

        if (!data) {
            return res.status(404).json({
                status: false,
                message: "Não encontrado.",
                data
            });
        }

        await this.repo.delete(id)
        .then((result: any) => {

            if (result.affected == 0) {
                return res.status(400).json({
                    status: false,
                    message: "Ocorreu um erro ao tentar deletar."
                });
            }

            return res.status(200).json({
                status: true,
                message: "Deletado com sucesso.",
                id
            });

        }).catch((error: any) => {
            return res.status(500).json({
                status: false,
                message: "Ocorreu um erro ao tentar deletar.",
                error: error.originalError?.info?.message || error.message || "Erro não identificado."
            });
        });
    }
}

