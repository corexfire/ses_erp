import { Module } from '@nestjs/common';
import { FakturKeluaranController, FakturMasukanController, NsfpController, PpnMasaController } from './ppn/ppn.controller';
import { EBupotController, Pph21Controller, BuktiPotongController, IdBillingController } from './pph/pph.controller';
import { EqualizationController, FiscalReconciliationController } from './compliance/compliance.controller';

@Module({
  controllers: [
    FakturKeluaranController,
    FakturMasukanController,
    NsfpController,
    PpnMasaController,
    EBupotController,
    Pph21Controller,
    BuktiPotongController,
    IdBillingController,
    EqualizationController,
    FiscalReconciliationController,
  ],
})
export class TaxModule {}