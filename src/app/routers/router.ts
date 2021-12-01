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


// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/", testController)

router.post("/addProblem",isActiveUser, isValidProblemData, addingProblemController)
router.get("/getProblems/solvedFilter=:SOLVED/organizationFilter=:ORGANIZATION",
            isValidSolvedFilterInParams, isValidOrganizationFilterInParams, getProblemsController)
router.get("/getAllUnsolvedProblems", getAllUnsolvedProblemsController)
router.get("/getAllSolvedProblems", getAllSolvedProblemsController)
router.get("/getProblem/:problemId", isValidProblemIdInParams,getProblemByIdController)
router.delete("/deleteProblem", deleteProblemController)

router.post("/signIn", isValidSignInData, signInController)
router.delete("/deleteUser", deleteUserController)
router.get("/getUser/:userId", isValidUserIdInParams, getUserController)

router.get("/getOrganizations", getOrganizationController)
router.get("/getOrganization/:organizationId", isValidOrganizationIdInParams, getOrganizationByIdController)