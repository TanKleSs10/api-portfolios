import { LeadEntity } from "../../entities/lead.entity";
import { LeadRepository } from "../../repositories/lead.repository";

export interface IFindLeadByIdUseCase {
    execute(id: string): Promise<LeadEntity | null>;
}

export class FindLeadByIdUseCase implements IFindLeadByIdUseCase {
    constructor(
        private readonly leadRepository: LeadRepository
    ){}

    execute(id: string): Promise<LeadEntity | null> { 
        return this.leadRepository.findLeadById(id);
    }
}