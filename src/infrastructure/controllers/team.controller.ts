import type { Request, Response } from "express";
import { CreateTeamUseCase } from "../../application/use-cases/team/create.use-case.js";
import { UpdateTeamUseCase } from "../../application/use-cases/team/update.use-case.js";
import { DeleteTeamUseCase } from "../../application/use-cases/team/delete.use-case.js";
import { GetAllTeamUseCase } from "../../application/use-cases/team/get-all.use-case.js";
import { GetTeamByIdUseCase } from "../../application/use-cases/team/get-by-id.use-case.js";
import { GetTeamByNameUseCase } from "../../application/use-cases/team/get-by-name.use-case.js";
import { GetTeamsByLeagueUseCase } from "../../application/use-cases/team/get-by-league.use-case.js";

export class TeamController {
    constructor(
        private readonly createTeamUseCase: CreateTeamUseCase,
        private readonly updateTeamUseCase: UpdateTeamUseCase,
        private readonly deleteTeamUseCase: DeleteTeamUseCase,
        private readonly getAllTeamUseCase: GetAllTeamUseCase,
        private readonly getTeamByIdUseCase: GetTeamByIdUseCase,
        private readonly getTeamByNameUseCase: GetTeamByNameUseCase,
        private readonly getTeamsByLeagueUseCase: GetTeamsByLeagueUseCase
    ) {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.getByLeague = this.getByLeague.bind(this);
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, leagueId, league } = req.body;

            // Extract leagueId robustly
            const finalLeagueId = leagueId || (league && league.id);

            if (!finalLeagueId) {
                throw new Error("leagueId is required");
            }

            const team = await this.createTeamUseCase.execute({ name, leagueId: finalLeagueId });
            res.status(201).json(team);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const { name, leagueId, league } = req.body;

            const finalLeagueId = leagueId || (league && league.id);

            const team = await this.updateTeamUseCase.execute({
                id,
                name,
                leagueId: finalLeagueId
            });
            if (!team) {
                res.status(404).json({ error: "Team not found" });
                return;
            }
            res.status(200).json(team);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const result = await this.deleteTeamUseCase.execute({ id });
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Team not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const teams = await this.getAllTeamUseCase.execute();
            res.status(200).json(teams);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const team = await this.getTeamByIdUseCase.execute({ id });
            if (!team) {
                res.status(404).json({ error: "Id not found" });
                return;
            }
            res.status(200).json(team);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async getByName(req: Request, res: Response): Promise<void> {
        try {
            const name = req.params.name as string;
            const team = await this.getTeamByNameUseCase.execute({ name });
            if (!team) {
                res.status(404).json({ error: "Name not found" });
                return;
            }
            res.status(200).json(team);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async getByLeague(req: Request, res: Response): Promise<void> {
        try {
            const leagueId = req.params.leagueId as string;
            const teams = await this.getTeamsByLeagueUseCase.execute({ leagueId });
            res.status(200).json(teams);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
