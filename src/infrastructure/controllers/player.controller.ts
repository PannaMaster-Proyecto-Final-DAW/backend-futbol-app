import type { Request, Response } from "express";
import { CreatePlayerUseCase } from "../../application/use-cases/player/create.use-case.js";
import { UpdatePlayerUseCase } from "../../application/use-cases/player/update.use-case.js";
import { DeletePlayerUseCase } from "../../application/use-cases/player/delete.use-case.js";
import { GetAllPlayerUseCase } from "../../application/use-cases/player/get-all.use-case.js";
import { GetPlayerByIdUseCase } from "../../application/use-cases/player/get-by-id.use-case.js";
import { GetPlayerByNameUseCase } from "../../application/use-cases/player/get-by-name.use-case.js";
import { SearchPlayersUseCase } from "../../application/use-cases/player/search-players.use-case.js";
import { PlayerPosition } from "../../domain/entities/player.entity.js";

export class PlayerController {
    constructor(
        private readonly createPlayerUseCase: CreatePlayerUseCase,
        private readonly updatePlayerUseCase: UpdatePlayerUseCase,
        private readonly deletePlayerUseCase: DeletePlayerUseCase,
        private readonly getAllPlayerUseCase: GetAllPlayerUseCase,
        private readonly getPlayerByIdUseCase: GetPlayerByIdUseCase,
        private readonly getPlayerByNameUseCase: GetPlayerByNameUseCase,
        private readonly searchPlayersUseCase: SearchPlayersUseCase
    ) {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.search = this.search.bind(this);
    }

    // Create a new player
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, position, teamId, countryId, pictureUrl } = req.body;
            const player = await this.createPlayerUseCase.execute({
                name,
                position,
                teamId,
                countryId,
                pictureUrl
            });
            res.status(201).json(player);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Update a player
    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const { name, position, teamId, countryId, pictureUrl } = req.body;
            const player = await this.updatePlayerUseCase.execute(id, {
                name,
                position,
                teamId,
                countryId,
                pictureUrl
            });
            res.status(200).json(player);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete a player
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const result = await this.deletePlayerUseCase.execute(id);
            if (result) {
                res.status(200).json(true);
            } else {
                res.status(404).json({ error: "Player not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all players
    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const players = await this.getAllPlayerUseCase.execute();
            res.status(200).json(players);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a player by id
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            const player = await this.getPlayerByIdUseCase.execute(id);
            if (!player) {
                res.status(404).json({ error: "Player not found" });
                return;
            }
            res.status(200).json(player);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    // Get a player by name
    async getByName(req: Request, res: Response): Promise<void> {
        try {
            const name = req.params.name as string;
            const player = await this.getPlayerByNameUseCase.execute(name);
            if (!player) {
                res.status(404).json({ error: "Player not found" });
                return;
            }
            res.status(200).json(player);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    // Search players
    async search(req: Request, res: Response): Promise<void> {
        try {
            const { teamId, countryId, position } = req.query;
            const players = await this.searchPlayersUseCase.execute({
                teamId: teamId as string,
                countryId: countryId as string,
                position: position as PlayerPosition
            });
            res.status(200).json(players);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
