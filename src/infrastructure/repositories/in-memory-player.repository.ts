import { Player, PlayerPosition } from "../../domain/entities/player.entity.js";
import { PlayerRepository } from "../../domain/repositories/player.domain.repository.js";

export class InMemoryPlayerRepository implements PlayerRepository {
    private players: Player[] = [];

    // Create a new player
    async create(player: Player): Promise<Player> {
        this.players.push(player);
        return player;
    }

    // Update a player
    async update(id: string, player: Player): Promise<Player | null> {
        const index = this.players.findIndex(p => p.id === id);
        if (index !== -1) {
            this.players[index] = player;
            return player;
        }
        return null;
    }

    // Delete a player
    async delete(id: string): Promise<boolean> {
        const index = this.players.findIndex(p => p.id === id);
        if (index === -1) {
            return false;
        }
        this.players.splice(index, 1);
        return true;
    }

    // Get all players
    async getAll(): Promise<Player[]> {
        return [...this.players];
    }

    // Get player by id
    async getById(id: string): Promise<Player | null> {
        return this.players.find(p => p.id === id) || null;
    }

    // Get player by name
    async getByName(name: string): Promise<Player | null> {
        return this.players.find(p => p.name.toLowerCase() === name.toLowerCase()) || null;
    }

    // Search methods
    async getByTeam(teamId: string): Promise<Player[]> {
        return this.players.filter(p => p.team.id === teamId);
    }

    async getByCountry(countryId: string): Promise<Player[]> {
        return this.players.filter(p => p.country.id === countryId);
    }

    async getByPosition(position: PlayerPosition): Promise<Player[]> {
        return this.players.filter(p => p.position.includes(position));
    }

    async getByTeamAndPosition(teamId: string, position: PlayerPosition): Promise<Player[]> {
        return this.players.filter(p => p.team.id === teamId && p.position.includes(position));
    }

    async getByTeamAndCountry(teamId: string, countryId: string): Promise<Player[]> {
        return this.players.filter(p => p.team.id === teamId && p.country.id === countryId);
    }

    async getByTeamAndCountryAndPosition(teamId: string, countryId: string, position: PlayerPosition): Promise<Player[]> {
        return this.players.filter(p =>
            p.team.id === teamId &&
            p.country.id === countryId &&
            p.position.includes(position)
        );
    }

    async getByTier(tier: number): Promise<Player[]> {
        return this.players.filter(p => p.tier === tier);
    }
}
