import { PlayerPosition } from "./player.entity.js";

export class Formation {
    constructor(
        public id: string, // UUID
        public name: string,
        public goalkeeper: PlayerPosition = PlayerPosition.GK,
        public defenders: PlayerPosition[],
        public midfielders: PlayerPosition[],
        public forwards: PlayerPosition[],
    ) { }

    /**
     * Factory method to create a Formation from a flat list of 11 positions.
     * This method automatically classifies each position into its corresponding 
     * tactical group (defenders, midfielders, or forwards) based on the PlayerPosition enum.
     * 
     * @param id - Unique identifier for the formation (UUID).
     * @param name - Human-readable name for the formation (e.g., "4-4-2").
     * @param positions - A flat array containing exactly 11 PlayerPosition values.
     */
    static createFromPositionsList(id: string, name: string, positions: PlayerPosition[]): Formation {
        // 1. Identify the Goalkeeper:
        // We look for the first occurrence of GK. If not found, we use GK as a safe default.
        const goalkeeper = positions.find(p => p === PlayerPosition.GK) ?? PlayerPosition.GK;

        // 2. Define tactical zone maps:
        // We group specific enum values into broader tactical zones to handle classification.
        const defenderPositions = [PlayerPosition.LB, PlayerPosition.RB, PlayerPosition.CB];
        const midfielderPositions = [PlayerPosition.LM, PlayerPosition.RM, PlayerPosition.CM, PlayerPosition.CDM, PlayerPosition.CAM];
        const forwardPositions = [PlayerPosition.LW, PlayerPosition.RW, PlayerPosition.CF, PlayerPosition.ST];

        // 3. Automatic classification (Filtering):
        // We filter the input array to populate each group. 
        // Note: Using .filter() ensures that we capture ALL matches (e.g., if there are multiple 'CB' or 'CM' entries).
        const defenders = positions.filter(p => defenderPositions.includes(p));
        const midfielders = positions.filter(p => midfielderPositions.includes(p));
        const forwards = positions.filter(p => forwardPositions.includes(p));

        // 4. Instance creation:
        // Returns a new Formation instance with the positions already grouped into tactical areas.
        return new Formation(id, name, goalkeeper, defenders, midfielders, forwards);
    }
}