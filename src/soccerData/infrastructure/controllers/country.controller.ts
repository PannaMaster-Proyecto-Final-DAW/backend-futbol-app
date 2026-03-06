import type { Request, Response } from "express";
import { CreateCountryUseCase } from "../../application/use-cases/country/create.use-case.js";
import { GetAllCountryUseCase } from "../../application/use-cases/country/get-all.use-case.js";
import { GetCountryByIdUseCase } from "../../application/use-cases/country/get-by-id.use-case.js";
import { GetCountryByNameUseCase } from "../../application/use-cases/country/get-by-name.use-case.js";
import { UpdateCountryUseCase } from "../../application/use-cases/country/update.use-case.js";
import { DeleteCountryUseCase } from "../../application/use-cases/country/delete.use-case.js";

export class CountryController {
    /**
     * Constructor for country controller:
     * @param createCountryUseCase 
     * @param getAllCountryUseCase 
     * @param getCountryByIdUseCase 
     * @param getCountryByNameUseCase 
     * @param updateCountryUseCase 
     * @param deleteCountryUseCase 
     */
    constructor(
        private readonly createCountryUseCase: CreateCountryUseCase,
        private readonly getAllCountryUseCase: GetAllCountryUseCase,
        private readonly getCountryByIdUseCase: GetCountryByIdUseCase,
        private readonly getCountryByNameUseCase: GetCountryByNameUseCase,
        private readonly updateCountryUseCase: UpdateCountryUseCase,
        private readonly deleteCountryUseCase: DeleteCountryUseCase
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // Create a new country
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;

            const country = await this.createCountryUseCase.execute({ name });

            res.status(201).json(country);

        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get all countries
    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const countries = await this.getAllCountryUseCase.execute();
            res.status(200).json(countries);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get country by id
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const country = await this.getCountryByIdUseCase.execute({ id });
            res.status(200).json(country);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async getByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.params;
            if (!name || typeof name !== 'string') {
                res.status(400).json({ error: 'Invalid name' });
                return;
            }
            const country = await this.getCountryByNameUseCase.execute({ name });
            res.status(200).json(country);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const country = await this.updateCountryUseCase.execute({ id, name });
            res.status(200).json(country);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const result = await this.deleteCountryUseCase.execute({ id });
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Country not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
