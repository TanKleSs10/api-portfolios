import { LeadDatasource } from "../../domain/datasources/lead.datasource";
import { CreateLeadDto } from "../../domain/dtos/lead/createLead.dto";
import { UpdateLeadDto } from "../../domain/dtos/lead/updateLead.dto";
import { LeadEntity } from "../../domain/entities/lead.entity";

export class LeadRepository implements LeadDatasource{
    constructor(
        private readonly leadDataSource: LeadDatasource
    ){}

    createLead(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
    return this.leadDataSource.createLead(createLeadDto);    
    }
    findLeadById(id: string): Promise<LeadEntity> {
        return this.leadDataSource.findLeadById(id);
    }
    findAllLeads(): Promise<LeadEntity[]> {
        return this.leadDataSource.findAllLeads();
    }
    updateLead(updateLeadDto: UpdateLeadDto): Promise<LeadEntity> {
        return this.leadDataSource.updateLead(updateLeadDto);
    }
    deleteLead(id: string): Promise<LeadEntity> {
        return this.leadDataSource.deleteLead(id);
    }

}