import { Formation } from "../../domain/entities/formation.entity.js";

export class FormationMapper {
    static toResponse(formation: Formation) {
        return {
            id: formation.id,
            name: formation.name,
            goalkeeper: formation.goalkeeper,
            defenders: formation.defenders,
            midfielders: formation.midfielders,
            forwards: formation.forwards
        };
    }

    static toResponseList(formations: Formation[]) {
        return formations.map(formation => this.toResponse(formation));
    }
}
