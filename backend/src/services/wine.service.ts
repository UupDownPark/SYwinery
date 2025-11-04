import { prisma } from "../config/db";

export const list = () => prisma.wine.findMany({ orderBy: { id: "desc" } });
export const get = (id: number) => prisma.wine.findUnique({ where: { id } });
export const create = (data: any) => prisma.wine.create({ data });
export const remove = (id: number) => prisma.wine.delete({ where: { id } });
