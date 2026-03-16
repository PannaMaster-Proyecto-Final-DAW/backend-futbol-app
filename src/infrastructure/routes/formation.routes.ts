// Express
import { Router } from "express";

// Controller
import { FormationController } from "../controllers/formation.controller.js";

// Use Cases
import { CreateFormationUseCase } from "../../application/use-cases/formation/create.use-case.js";
import { GetAllFormationsUseCase } from "../../application/use-cases/formation/get-all.use-case.js";
import { GetFormationByIdUseCase } from "../../application/use-cases/formation/get-by-id.use-case.js";
import { GetFormationByNameUseCase } from "../../application/use-cases/formation/get-by-name.use-case.js";
import { UpdateFormationUseCase } from "../../application/use-cases/formation/update.use-case.js";
import { DeleteFormationUseCase } from "../../application/use-cases/formation/delete.use-case.js";
import { idGenerator, formationRepository } from "../container.js";

const router = Router();

// Dependency Injection
const createFormationUseCase = new CreateFormationUseCase(formationRepository, idGenerator);
const getAllFormationsUseCase = new GetAllFormationsUseCase(formationRepository);
const getFormationByIdUseCase = new GetFormationByIdUseCase(formationRepository);
const getFormationByNameUseCase = new GetFormationByNameUseCase(formationRepository);
const updateFormationUseCase = new UpdateFormationUseCase(formationRepository);
const deleteFormationUseCase = new DeleteFormationUseCase(formationRepository);

const formationController = new FormationController(
    createFormationUseCase,
    getAllFormationsUseCase,
    getFormationByIdUseCase,
    getFormationByNameUseCase,
    updateFormationUseCase,
    deleteFormationUseCase
);

// Routes
router.post("/", formationController.create);
router.get("/", formationController.getAll);
router.get("/:id", formationController.getById);
router.get("/name/:name", formationController.getByName);
router.patch("/:id", formationController.update);
router.delete("/:id", formationController.delete);

export { router as formationRouter }
