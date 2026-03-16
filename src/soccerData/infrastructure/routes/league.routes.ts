// Express
import { Router } from "express";

// Controller
import { LeagueController } from "../controllers/league.controller.js";

// Use Cases
import { CreateLeagueUseCase } from "../../application/use-cases/league/create.use-case.js";
import { GetAllLeagueUseCase } from "../../application/use-cases/league/get-all.use-case.js";
import { GetLeagueByIdUseCase } from "../../application/use-cases/league/get-by-id.use-case.js";
import { GetLeagueByNameUseCase } from "../../application/use-cases/league/get-by-name.use-case.js";
import { GetLeagueByCountryUseCase } from "../../application/use-cases/league/get-by-country.use-case.js";
import { GetLeagueByCategoryUseCase } from "../../application/use-cases/league/get-by-category.use-case.js";
import { UpdateLeagueUseCase } from "../../application/use-cases/league/update.use-case.js";
import { DeleteLeagueUseCase } from "../../application/use-cases/league/delete.use-case.js";
import { countryRepository, idGenerator, leagueRepository } from "../container.js";

const router = Router();

// Dependency Injection
const createLeagueUseCase = new CreateLeagueUseCase(leagueRepository, countryRepository, idGenerator);
const getAllLeagueUseCase = new GetAllLeagueUseCase(leagueRepository);
const getLeagueByIdUseCase = new GetLeagueByIdUseCase(leagueRepository);
const getLeagueByNameUseCase = new GetLeagueByNameUseCase(leagueRepository);
const getLeagueByCountryUseCase = new GetLeagueByCountryUseCase(leagueRepository);
const getLeagueByCategoryUseCase = new GetLeagueByCategoryUseCase(leagueRepository);
const updateLeagueUseCase = new UpdateLeagueUseCase(leagueRepository, countryRepository);
const deleteLeagueUseCase = new DeleteLeagueUseCase(leagueRepository);

const leagueController = new LeagueController(
    createLeagueUseCase,
    getAllLeagueUseCase,
    getLeagueByIdUseCase,
    getLeagueByNameUseCase,
    getLeagueByCountryUseCase,
    getLeagueByCategoryUseCase,
    updateLeagueUseCase,
    deleteLeagueUseCase
);

// Routes
router.post("/", leagueController.create);
router.get("/", leagueController.getAll);
router.get("/id/:id", leagueController.getById);
router.get("/name/:name", leagueController.getByName);
router.get("/country/:countryId", leagueController.getByCountry);
router.get("/category/:category", leagueController.getByCategory);
router.patch("/:id", leagueController.update);
router.delete("/:id", leagueController.delete);

export { router as leagueRouter }
