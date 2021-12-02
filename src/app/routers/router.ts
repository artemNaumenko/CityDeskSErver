import { Router } from 'express';
import {
    addingProblemController, deleteProblemController,
    getAllSolvedProblemsController,
    getAllUnsolvedProblemsController, getProblemByIdController, getProblemsController
} from "../controllers/problemController";
import {deleteUserController, getUserController, signInController} from "../controllers/userController";
import {isActiveUser} from "../middleware/isActiveUser";
import {testController} from "../controllers/testController";
import {isValidUserIdInParams} from "../middleware/isValidUserIdInParams";
import {isValidProblemData} from "../middleware/isValidProblemData";
import {isValidSignInData} from "../middleware/isValidSignInData";
import {getOrganizationByIdController, getOrganizationController} from "../controllers/organizationController";
import {isValidProblemIdInParams} from "../middleware/isValidProblemIdInParams";
import {isValidOrganizationIdInParams} from "../middleware/isValidOrganizationIdInParams";
import {isValidSolvedFilterInParams} from "../middleware/isValidSolvedFilterInParams";
import {isValidOrganizationFilterInParams} from "../middleware/isValidOrganizationFilterInParams";
import {isValidApiKey} from "../middleware/isValidApiKey";


// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/", isValidApiKey, testController)

router.post("/addProblem", isValidApiKey, isActiveUser, isValidProblemData, addingProblemController)
router.get("/getProblems/solvedFilter=:SOLVED/organizationFilter=:ORGANIZATION",
                isValidApiKey, isValidSolvedFilterInParams, isValidOrganizationFilterInParams, getProblemsController)
router.get("/getAllUnsolvedProblems", isValidApiKey, getAllUnsolvedProblemsController)
router.get("/getAllSolvedProblems", isValidApiKey ,getAllSolvedProblemsController)
router.get("/getProblem/:problemId", isValidApiKey, isValidProblemIdInParams,getProblemByIdController)
router.delete("/deleteProblem", isValidApiKey, deleteProblemController)

router.post("/signIn", isValidApiKey,isValidSignInData, signInController)
router.delete("/deleteUser", isValidApiKey, deleteUserController)
router.get("/getUser/:userId", isValidApiKey, isValidUserIdInParams, getUserController)

router.get("/getOrganizations", isValidApiKey,getOrganizationController)
router.get("/getOrganization/:organizationId", isValidApiKey,isValidOrganizationIdInParams, getOrganizationByIdController)