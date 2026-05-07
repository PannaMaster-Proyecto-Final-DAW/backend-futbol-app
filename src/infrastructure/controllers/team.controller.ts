import type { Request, Response } from "express";
import { CreateTeamUseCase } from "../../application/use-cases/team/create.use-case.js";
import { UpdateTeamUseCase } from "../../application/use-cases/team/update.use-case.js";
import { DeleteTeamUseCase } from "../../application/use-cases/team/delete.use-case.js";
import { GetAllTeamUseCase } from "../../application/use-cases/team/get-all.use-case.js";
import { GetTeamByIdUseCase } from "../../application/use-cases/team/get-by-id.use-case.js";
import { GetTeamByNameUseCase } from "../../application/use-cases/team/get-by-name.use-case.js";
import { GetTeamsByLeagueUseCase } from "../../application/use-cases/team/get-by-league.use-case.js";
import { GetTeamByTierUseCase } from "../../application/use-cases/team/get-by-tier.use-case.js";
import { TeamMapper } from "../mappers/team.mapper.js";

export class TeamController {
    constructor(
        private readonly createTeamUseCase: CreateTeamUseCase,
        private readonly updateTeamUseCase: UpdateTeamUseCase,
        private readonly deleteTeamUseCase: DeleteTeamUseCase,
        private readonly getAllTeamUseCase: GetAllTeamUseCase,
        private readonly getTeamByIdUseCase: GetTeamByIdUseCase,
        private readonly getTeamByNameUseCase: GetTeamByNameUseCase,
        private readonly getTeamsByLeagueUseCase: GetTeamsByLeagueUseCase,
        private readonly getTeamByTierUseCase: GetTeamByTierUseCase
    ) {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.getByLeague = this.getByLeague.bind(this);
        this.getByTier = this.getByTier.bind(this);
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, leagueId, league, pictureUrl, tier } = req.body;

            // Extract leagueId robustly
            const finalLeagueId = leagueId || (league && league.id);

            if (!finalLeagueId) {
                throw new Error("leagueId is required");
            }

            const team = await this.createTeamUseCase.execute({ name, leagueId: finalLeagueId, pictureUrl, tier });
            res.status(201).json(TeamMapper.toResponse(team));
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const { name, leagueId, league, pictureUrl, tier } = req.body;

            const finalLeagueId = leagueId || (league && league.id);

            const team = await this.updateTeamUseCase.execute({
                id,
                name,
                leagueId: finalLeagueId,
                pictureUrl,
                tier
            });
            if (!team) {
                res.status(404).json({ error: "Team not found" });
                return;
            }
            res.status(200).json(TeamMapper.toResponse(team));
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
            res.status(200).json(TeamMapper.toResponseList(teams));
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
            res.status(200).json(TeamMapper.toResponse(team));
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
            res.status(200).json(TeamMapper.toResponse(team));
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async getByLeague(req: Request, res: Response): Promise<void> {
        try {
            const leagueId = req.params.leagueId as string;
            const teams = await this.getTeamsByLeagueUseCase.execute({ leagueId });
            res.status(200).json(TeamMapper.toResponseList(teams));
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getByTier(req: Request, res: Response): Promise<void> {
        try {
            const tier = parseInt(req.params.tier as string);
            if (isNaN(tier)) {
                throw new Error("Tier must be a number");
            }
            const teams = await this.getTeamByTierUseCase.execute({ tier });
            res.status(200).json(TeamMapper.toResponseList(teams));
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
