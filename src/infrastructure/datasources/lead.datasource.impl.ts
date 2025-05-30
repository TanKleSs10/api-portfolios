import { LeadDatasource } from "../../domain/datasources/lead.datasource";
import { CreateLeadDto } from "../../domain/dtos/lead/createLead.dto";
import { UpdateLeadDto } from "../../domain/dtos/lead/updateLead.dto";
import { LeadEntity } from "../../domain/entities/lead.entity";
import { leadModel } from "../models/leadModel";

export class LeadDataSourceImpl implements LeadDatasource {
    async createLead(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
        const newLead = await leadModel.create(createLeadDto);
        return LeadEntity.fromObject(newLead);
    }
    
    async findLeadById(id: string): Promise<LeadEntity> {
        const lead = await leadModel.findById(id);
        if (!lead) {
            throw new Error("Lead not found.");
        }
        return LeadEntity.fromObject(lead);
    }

    async findAllLeads(): Promise<LeadEntity[]> {
        const leads = await leadModel.find();
        return leads.map(lead => LeadEntity.fromObject(lead));
    }

    async updateLead(updateLeadDto: UpdateLeadDto): Promise<LeadEntity> {
        const lead = await leadModel.findByIdAndUpdate(updateLeadDto.id,
            { $set: updateLeadDto.values },
            { new: true, runValidators: true }
        );
        if (!lead) {
            throw new Error("Lead not found.");
        }
        return LeadEntity.fromObject(lead);
    }

    async deleteLead(id: string): Promise<LeadEntity> {
        const lead = await leadModel.findByIdAndDelete(id);
        if (!lead) {
            throw new Error("Lead not found.");
        }
        return LeadEntity.fromObject(lead);
    }
}