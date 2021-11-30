import { Router } from 'express';
import {
    addingProblemController, deleteProblemController,
    getAllSolvedProblemsController,
    getAllUnsolvedProblemsController
} from "../controllers/problemController";
import {deleteUserController, getUserController, signInController} from "../controllers/userController";
import {isActiveUser} from "../middleware/isActiveUser";
import {testController} from "../controllers/testController";
import {isCorrectUserIdInParams} from "../middleware/isCorrectUserIdInParams";


// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/", testController)

router.post("/addProblem",isActiveUser, addingProblemController)
router.get("/getAllUnsolvedProblems", getAllUnsolvedProblemsController)
router.get("/getAllSolvedProblems", getAllSolvedProblemsController)
router.delete("/deleteProblem", deleteProblemController)

router.post("/signIn", signInController)
router.delete("/deleteUser", deleteUserController)
router.get("/getUser/:userId", isCorrectUserIdInParams, getUserController)