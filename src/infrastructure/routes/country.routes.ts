// Express
import { Router } from "express";

// Controller
import { CountryController } from "../controllers/country.controller.js";

// Use Cases
import { CreateCountryUseCase } from "../../application/use-cases/country/create.use-case.js";
import { GetAllCountryUseCase } from "../../application/use-cases/country/get-all.use-case.js";
import { GetCountryByIdUseCase } from "../../application/use-cases/country/get-by-id.use-case.js";
import { GetCountryByNameUseCase } from "../../application/use-cases/country/get-by-name.use-case.js";
import { UpdateCountryUseCase } from "../../application/use-cases/country/update.use-case.js";
import { DeleteCountryUseCase } from "../../application/use-cases/country/delete.use-case.js";
import { idGenerator, countryRepository } from "../container.js";

const router = Router();

// Dependency Injection
const createCountryUseCase = new CreateCountryUseCase(countryRepository, idGenerator);
const getAllCountryUseCase = new GetAllCountryUseCase(countryRepository);
const getCountryByIdUseCase = new GetCountryByIdUseCase(countryRepository);
const getCountryByNameUseCase = new GetCountryByNameUseCase(countryRepository);
const updateCountryUseCase = new UpdateCountryUseCase(countryRepository);
const deleteCountryUseCase = new DeleteCountryUseCase(countryRepository);

const countryController = new CountryController(
    createCountryUseCase,
    getAllCountryUseCase,
    getCountryByIdUseCase,
    getCountryByNameUseCase,
    updateCountryUseCase,
    deleteCountryUseCase
);

// Routes
router.post("/", countryController.create);
router.get("/", countryController.getAll);
router.get("/id/:id", countryController.getById);
router.get("/name/:name", countryController.getByName);
router.patch("/:id", countryController.update);
router.delete("/:id", countryController.delete);

export { router as countryRouter }
