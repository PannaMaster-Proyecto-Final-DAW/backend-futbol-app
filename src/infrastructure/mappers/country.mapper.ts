import { Country } from "../../domain/entities/country.entity.js";

export class CountryMapper {
    static toResponse(country: Country) {
        return {
            id: country.id,
            name: country.name,
            tierMale: country.tierMale,
            tierFemale: country.tierFemale,
            pictureUrl: country.pictureUrl || null
        };
    }

    static toResponseList(countries: Country[]) {
        return countries.map(country => this.toResponse(country));
    }
}
