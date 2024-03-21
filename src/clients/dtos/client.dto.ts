export class CreatePQClientDto {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly status: number;
  readonly clientType: number;
  readonly source?: number;
  readonly referrer?: number;
  readonly lastContact?: Date;
  readonly nextContact?: Date;
  readonly notes?: string;
  readonly isActive: boolean;

  // Relationship fields
  readonly addressId?: number;
  readonly userId?: number;
  readonly leadId?: number;
  readonly invoiceId?: number;
  readonly paymentId?: number;
  readonly communicationId?: number;
  readonly appointmentId?: number;
}

export class UpdatePQClientDto {
  readonly name?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly status?: number;
  readonly clientType?: number;
  readonly source?: number;
  readonly referrer?: number;
  readonly lastContact?: Date;
  readonly nextContact?: Date;
  readonly notes?: string;
  readonly isActive?: boolean;

  // Relationship fields
  readonly addressId?: number;
  readonly userId?: number;
  readonly leadId?: number;
  readonly invoiceId?: number;
  readonly paymentId?: number;
  readonly communicationId?: number;
  readonly appointmentId?: number;
}
