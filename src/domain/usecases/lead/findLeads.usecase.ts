import { LeadEntity } from "../../entities/lead.entity";
import { LeadRepository } from "../../repositories/lead.repository";

export interface IFindLeadsUseCase {
    execute(): Promise<LeadEntity[]>;
}

export class FindLeadsUseCase implements IFindLeadsUseCase {
    constructor(
        private readonly leadRepository: LeadRepository
    ){}

    execute(): Promise<LeadEntity[]> { 
        return this.leadRepository.findAllLeads();
    }
}