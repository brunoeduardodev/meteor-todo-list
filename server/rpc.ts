import * as grubba from "grubba-rpc";
import { todoRpc } from "./modules/todo/rpc";

const apiModule = grubba.createModule().addSubmodule(todoRpc).build();
export type Api = typeof apiModule;
