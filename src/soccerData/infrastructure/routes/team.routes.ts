// Express
import { Router } from "express";

// Controller
import { TeamController } from "../controllers/team.controller.js";

// Use Cases
import { CreateTeamUseCase } from "../../application/use-cases/team/create.use-case.js";
import { UpdateTeamUseCase } from "../../application/use-cases/team/update.use-case.js";
import { DeleteTeamUseCase } from "../../application/use-cases/team/delete.use-case.js";
import { GetAllTeamUseCase } from "../../application/use-cases/team/get-all.use-case.js";
import { GetTeamByIdUseCase } from "../../application/use-cases/team/get-by-id.use-case.js";
import { GetTeamByNameUseCase } from "../../application/use-cases/team/get-by-name.use-case.js";
import { GetTeamsByLeagueUseCase } from "../../application/use-cases/team/get-by-league.use-case.js";
import { idGenerator, leagueRepository, teamRepository } from "../container.js";

const router = Router();

// Dependency Injection (Manual)
const createTeamUseCase = new CreateTeamUseCase(teamRepository, leagueRepository, idGenerator);
const updateTeamUseCase = new UpdateTeamUseCase(teamRepository, leagueRepository);
const deleteTeamUseCase = new DeleteTeamUseCase(teamRepository);
const getAllTeamUseCase = new GetAllTeamUseCase(teamRepository);
const getTeamByIdUseCase = new GetTeamByIdUseCase(teamRepository);
const getTeamByNameUseCase = new GetTeamByNameUseCase(teamRepository);
const getTeamsByLeagueUseCase = new GetTeamsByLeagueUseCase(teamRepository);

const teamController = new TeamController(
    createTeamUseCase,
    updateTeamUseCase,
    deleteTeamUseCase,
    getAllTeamUseCase,
    getTeamByIdUseCase,
    getTeamByNameUseCase,
    getTeamsByLeagueUseCase
);

// Routes
router.post("/", teamController.create);
router.get("/", teamController.getAll);
router.get("/id/:id", teamController.getById);
router.get("/name/:name", teamController.getByName);
router.get("/league/:leagueId", teamController.getByLeague);
router.patch("/:id", teamController.update);
router.delete("/:id", teamController.delete);

export { router as teamRouter }
