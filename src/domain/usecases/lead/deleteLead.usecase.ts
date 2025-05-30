import { LeadEntity } from "../../entities/lead.entity";
import { LeadRepository } from "../../repositories/lead.repository";

export interface IDeleteLeadUseCase {
    execute(id: string): Promise<LeadEntity>;
}

export class DeleteLeadUseCase implements IDeleteLeadUseCase {
    constructor(
        private readonly leadRepository: LeadRepository
    ){}

    execute(id: string): Promise<LeadEntity> {
        return this.leadRepository.deleteLead(id);
    }
}