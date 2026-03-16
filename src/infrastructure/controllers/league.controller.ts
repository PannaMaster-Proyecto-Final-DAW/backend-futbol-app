import type { Request, Response } from "express";
import { CreateLeagueUseCase } from "../../application/use-cases/league/create.use-case.js";
import { GetAllLeagueUseCase } from "../../application/use-cases/league/get-all.use-case.js";
import { GetLeagueByIdUseCase } from "../../application/use-cases/league/get-by-id.use-case.js";
import { GetLeagueByNameUseCase } from "../../application/use-cases/league/get-by-name.use-case.js";
import { GetLeagueByCountryUseCase } from "../../application/use-cases/league/get-by-country.use-case.js";
import { GetLeagueByCategoryUseCase } from "../../application/use-cases/league/get-by-category.use-case.js";
import { UpdateLeagueUseCase } from "../../application/use-cases/league/update.use-case.js";
import { DeleteLeagueUseCase } from "../../application/use-cases/league/delete.use-case.js";
import { LeagueCategory } from "../../domain/entities/league.entity.js";

export class LeagueController {
    constructor(
        private readonly createLeagueUseCase: CreateLeagueUseCase,
        private readonly getAllLeagueUseCase: GetAllLeagueUseCase,
        private readonly getLeagueByIdUseCase: GetLeagueByIdUseCase,
        private readonly getLeagueByNameUseCase: GetLeagueByNameUseCase,
        private readonly getLeagueByCountryUseCase: GetLeagueByCountryUseCase,
        private readonly getLeagueByCategoryUseCase: GetLeagueByCategoryUseCase,
        private readonly updateLeagueUseCase: UpdateLeagueUseCase,
        private readonly deleteLeagueUseCase: DeleteLeagueUseCase
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.getByCountry = this.getByCountry.bind(this);
        this.getByCategory = this.getByCategory.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, countryId, category, country } = req.body;

            // To be robust and solve the user's error, we extract countryId from 
            // either countryId OR country.id (common mistake in nested bodies)
            const finalCountryId = countryId || (country && country.id);

            if (!finalCountryId) {
                throw new Error("countryId is required (can be flat countryId or { country: { id } })");
            }

            const league = await this.createLeagueUseCase.execute({
                name,
                countryId: finalCountryId,
                category
            });
            res.status(201).json(league);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const leagues = await this.getAllLeagueUseCase.execute();
            res.status(200).json(leagues);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const league = await this.getLeagueByIdUseCase.execute({ id });
            res.status(200).json(league);
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
            const league = await this.getLeagueByNameUseCase.execute({ name });
            res.status(200).json(league);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async getByCountry(req: Request, res: Response): Promise<void> {
        try {
            const { countryId } = req.params;
            if (!countryId || typeof countryId !== 'string') {
                res.status(400).json({ error: 'Invalid country ID' });
                return;
            }
            const leagues = await this.getLeagueByCountryUseCase.execute({ countryId });
            res.status(200).json(leagues);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getByCategory(req: Request, res: Response): Promise<void> {
        try {
            const { category } = req.params;
            if (!category || !Object.values(LeagueCategory).includes(category as LeagueCategory)) {
                res.status(400).json({ error: 'Invalid category' });
                return;
            }
            const leagues = await this.getLeagueByCategoryUseCase.execute({ category: category as LeagueCategory });
            res.status(200).json(leagues);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, country, category } = req.body;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const league = await this.updateLeagueUseCase.execute({ id, name, countryId: country, category });
            res.status(200).json(league);
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
            const result = await this.deleteLeagueUseCase.execute({ id });
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "League not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
