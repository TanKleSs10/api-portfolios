import { CreateLeadDto } from "../../dtos/lead/createLead.dto";
import { LeadEntity } from "../../entities/lead.entity";
import { LeadRepository } from "../../repositories/lead.repository";

export interface IcreateLeadUseCase{
    execute(createLeadDto: CreateLeadDto): Promise<LeadEntity>;
}

export class CreateLeadUseCase implements IcreateLeadUseCase {
    constructor(
        private readonly leadRespository: LeadRepository
    ){}
    
    execute(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
        return this.leadRespository.createLead(createLeadDto);
    }
}