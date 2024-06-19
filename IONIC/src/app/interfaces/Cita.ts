import { Time } from "@angular/common";

export interface Cita {
    idCita?: number;
    hora: Time;
    fecha: Date;
    motivo: string;
    idPaciente: string;
    idFuncionario: string;
  }