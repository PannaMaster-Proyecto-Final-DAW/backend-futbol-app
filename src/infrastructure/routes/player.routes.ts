// Express
import { Router } from "express";

// Controller
import { PlayerController } from "../controllers/player.controller.js";

// Use Cases
import { CreatePlayerUseCase } from "../../application/use-cases/player/create.use-case.js";
import { UpdatePlayerUseCase } from "../../application/use-cases/player/update.use-case.js";
import { DeletePlayerUseCase } from "../../application/use-cases/player/delete.use-case.js";
import { GetAllPlayerUseCase } from "../../application/use-cases/player/get-all.use-case.js";
import { GetPlayerByIdUseCase } from "../../application/use-cases/player/get-by-id.use-case.js";
import { GetPlayerByNameUseCase } from "../../application/use-cases/player/get-by-name.use-case.js";
import { SearchPlayersUseCase } from "../../application/use-cases/player/search-players.use-case.js";

// Infrastructure
import {
    idGenerator,
    playerRepository,
    teamRepository,
    countryRepository
} from "../container.js";

const router = Router();

// Dependency Injection (Manual)
const createPlayerUseCase = new CreatePlayerUseCase(
    playerRepository,
    teamRepository,
    countryRepository,
    idGenerator
);
const updatePlayerUseCase = new UpdatePlayerUseCase(
    playerRepository,
    teamRepository,
    countryRepository
);
const deletePlayerUseCase = new DeletePlayerUseCase(playerRepository);
const getAllPlayerUseCase = new GetAllPlayerUseCase(playerRepository);
const getPlayerByIdUseCase = new GetPlayerByIdUseCase(playerRepository);
const getPlayerByNameUseCase = new GetPlayerByNameUseCase(playerRepository);
const searchPlayersUseCase = new SearchPlayersUseCase(playerRepository);

const playerController = new PlayerController(
    createPlayerUseCase,
    updatePlayerUseCase,
    deletePlayerUseCase,
    getAllPlayerUseCase,
    getPlayerByIdUseCase,
    getPlayerByNameUseCase,
    searchPlayersUseCase
);

// Routes
router.post("/", playerController.create);
router.get("/", playerController.getAll);
router.get("/search", playerController.search);
router.get("/id/:id", playerController.getById);
router.get("/name/:name", playerController.getByName);
router.patch("/:id", playerController.update);
router.delete("/:id", playerController.delete);

export { router as playerRouter }
