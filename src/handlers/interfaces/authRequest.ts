import { AuthenticatedUser } from "./user";
import { Request } from "express";

export interface AuthRequest<T = any> extends Request {
  params: any;
  user?: AuthenticatedUser;
  body: T;
}