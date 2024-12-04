import type { Request, Response } from "express";
export declare class TeamMemberController {
    static findMemberByEmail: (req: Request, res: Response) => Promise<void>;
    static getProjectTeam: (req: Request, res: Response) => Promise<void>;
    static addMemberById: (req: Request, res: Response) => Promise<void>;
    static removeMemberById: (req: Request, res: Response) => Promise<void>;
}
