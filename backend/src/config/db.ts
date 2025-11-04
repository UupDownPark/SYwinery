import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    logger.info("✅ Prisma connected to PostgreSQL");
  } catch (err) {
    logger.error("❌ Prisma connection failed");
    process.exit(1);
  }
})();
