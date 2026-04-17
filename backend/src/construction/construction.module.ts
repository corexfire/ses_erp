import { Module } from '@nestjs/common';
import { ConstructionController } from './construction.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ConstructionController],
  providers: [PrismaService],
})
export class ConstructionModule {}
