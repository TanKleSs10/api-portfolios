import { CreateLeadDto } from "../dtos/lead/createLead.dto";
import { UpdateLeadDto } from "../dtos/lead/updateLead.dto";
import { LeadEntity } from "../entities/lead.entity";

export abstract class LeadDatasource {
    abstract createLead(createLeadDto: CreateLeadDto): Promise<LeadEntity>;
    abstract findLeadById(id: string): Promise<LeadEntity>;
    abstract findAllLeads(): Promise<LeadEntity[]>;
    abstract updateLead(updateLeadDto: UpdateLeadDto): Promise<LeadEntity>;
    abstract deleteLead(id: string): Promise<LeadEntity>;
}