import type { Request, Response } from "express";
import { CreateFormationUseCase } from "../../application/use-cases/formation/create.use-case.js";
import { GetAllFormationsUseCase } from "../../application/use-cases/formation/get-all.use-case.js";
import { GetFormationByIdUseCase } from "../../application/use-cases/formation/get-by-id.use-case.js";
import { GetFormationByNameUseCase } from "../../application/use-cases/formation/get-by-name.use-case.js";
import { UpdateFormationUseCase } from "../../application/use-cases/formation/update.use-case.js";
import { DeleteFormationUseCase } from "../../application/use-cases/formation/delete.use-case.js";

export class FormationController {
    /**
     * Constructor for formation controller:
     * @param createFormationUseCase 
     * @param getAllFormationsUseCase 
     * @param getFormationByIdUseCase 
     * @param getFormationByNameUseCase 
     * @param updateFormationUseCase 
     * @param deleteFormationUseCase 
     */
    constructor(
        private readonly createFormationUseCase: CreateFormationUseCase,
        private readonly getAllFormationsUseCase: GetAllFormationsUseCase,
        private readonly getFormationByIdUseCase: GetFormationByIdUseCase,
        private readonly getFormationByNameUseCase: GetFormationByNameUseCase,
        private readonly updateFormationUseCase: UpdateFormationUseCase,
        private readonly deleteFormationUseCase: DeleteFormationUseCase
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // Create a new formation
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, goalkeeper, defenders, midfielders, forwards, positionsList } = req.body;

            const formation = await this.createFormationUseCase.execute({
                name,
                goalkeeper,
                defenders,
                midfielders,
                forwards,
                positionsList
            });

            res.status(201).json(formation);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get all formations
    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const formations = await this.getAllFormationsUseCase.execute();
            res.status(200).json(formations);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get formation by id
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const formation = await this.getFormationByIdUseCase.execute({ id });
            res.status(200).json(formation);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    // Get formation by name
    async getByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.params;
            if (!name || typeof name !== 'string') {
                res.status(400).json({ error: 'Invalid name' });
                return;
            }
            const formation = await this.getFormationByNameUseCase.execute({ name });
            res.status(200).json(formation);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    // Update an existing formation
    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, goalkeeper, defenders, midfielders, forwards } = req.body;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const formation = await this.updateFormationUseCase.execute({
                id,
                name,
                goalkeeper,
                defenders,
                midfielders,
                forwards
            });
            res.status(200).json(formation);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete a formation
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const result = await this.deleteFormationUseCase.execute({ id });
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Formation not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
