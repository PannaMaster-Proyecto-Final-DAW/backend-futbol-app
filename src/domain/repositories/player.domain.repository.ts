import type { Player, PlayerPosition } from "../entities/player.entity.js";

export interface PlayerRepository {
    // CRUD operations
    create(player: Player): Promise<Player>;
    update(id: string, player: Player): Promise<Player | null>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getAll(): Promise<Player[]>;
    getById(id: string): Promise<Player | null>;
    getByName(name: string): Promise<Player | null>;
    getByTeam(teamId: string): Promise<Player[]>;
    getByCountry(countryId: string): Promise<Player[]>;
    getByPosition(position: PlayerPosition): Promise<Player[]>;
    getByTeamAndPosition(teamId: string, position: PlayerPosition): Promise<Player[]>;
    getByTeamAndCountry(teamId: string, countryId: string): Promise<Player[]>;
    getByTeamAndCountryAndPosition(teamId: string, countryId: string, position: PlayerPosition): Promise<Player[]>;
}
