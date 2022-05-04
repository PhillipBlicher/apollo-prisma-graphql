import { PrismaClient } from '.prisma/client';
import { Users } from 'nexus-prisma';

export interface ContextType {
  db: PrismaClient;
  user: Users | undefined;
  
}
