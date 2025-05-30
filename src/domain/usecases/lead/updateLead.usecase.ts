import { UpdateLeadDto } from "../../dtos/lead/updateLead.dto";
import { LeadEntity } from "../../entities/lead.entity";
import { LeadRepository } from "../../repositories/lead.repository";

export interface IUpdateLeadUseCase {
    execute(updateLeadDto: UpdateLeadDto): Promise<LeadEntity>;
}

export class UpdateLeadUseCase implements IUpdateLeadUseCase {
    constructor(
        private readonly leadRepository: LeadRepository
    ){}

    execute(updateLeadDto: UpdateLeadDto): Promise<LeadEntity> { 
        return this.leadRepository.updateLead(updateLeadDto);
    }
}