import {Test} from './test';

export class Invoice {
  id: string;
  patientId: string;
  doctorId: string;
  createdDate: Date;
  tests: Test[];
}
