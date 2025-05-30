import type { Request, Response } from "express";
import { WinstonLogger } from "../../config/winstonConfig";
import { CreateLeadDto } from "../../domain/dtos/lead/createLead.dto";
import { LeadRepository } from "../../domain/repositories/lead.repository";
import { FindLeadsUseCase } from "../../domain/usecases/lead/findLeads.usecase";
import { UpdateLeadDto } from "../../domain/dtos/lead/updateLead.dto";
import { FindLeadByIdUseCase } from "../../domain/usecases/lead/findLeadById.usecase";
import { UpdateLeadUseCase } from "../../domain/usecases/lead/updateLead.usecase";
import { CreateLeadUseCase } from "../../domain/usecases/lead/createLead.usecase";
import { DeleteLeadUseCase } from "../../domain/usecases/lead/deleteLead.usecase";

export class LeadController {
    constructor(
        private readonly leadRepository: LeadRepository,
        private readonly logger: WinstonLogger
    ){}

    public createLead = (req: Request, res: Response) => {
        const [error, createLeadDto] = CreateLeadDto.create(req.body);
        if(error) {
            this.logger.error("Error creating lead", { error: error }, "leadController");
            res.status(400).json({
                success: false,
                message: "Error al recibir formulario",
                data: error
            });
        }else{
            new CreateLeadUseCase(this.leadRepository).execute(createLeadDto!).then(lead => {
                res.status(201).json({
                    success: true,
                    message: "Lead creado correctamente",
                    data: lead
                });
            }).catch(error => {
                this.logger.error("Error creating lead", { error: error as string }, "leadController");
                res.status(400).json({
                    success: false,
                    message: "Error al crear lead",
                    data: error
                });
            });
        }
    }

    public getLeads = (_req: Request, res: Response) => {
        new FindLeadsUseCase(this.leadRepository).execute().then(leads => {
            res.status(200).json({
                success: true,
                message: "Leads obtenidos correctamente",
                data: leads
            });
        }).catch(error => {
            this.logger.error("Error fetching leads", { error: error as string }, "leadController");
            res.status(400).json({
                success: false,
                message: "Error al obtener leads",
                data: error
            });
        });
    }

    public getLeadById = (req: Request, res: Response) => {
        const leadId = req.params.id;
        new FindLeadByIdUseCase(this.leadRepository).execute(leadId).then(lead => {
            if(!lead) {
                this.logger.warn("Lead not found", { leadId }, "leadController");
                res.status(404).json({
                    success: false,
                    message: "Lead no encontrado",
                    data: null
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Lead obtenido correctamente",
                    data: lead
                });
            }
        }).catch(error => {
            this.logger.error("Error fetching lead by ID", { error: error as string }, "leadController");
            res.status(400).json({
                success: false,
                message: "Error al obtener lead",
                data: error
            });
        });
    }

    public updateLead = (req: Request, res: Response) => {
        const id = req.params.id;
        const [error, updateLeadDto] = UpdateLeadDto.create({id, ...req.body});
        if(error) {
            this.logger.error("Error updating lead", { error: error }, "leadController");
            res.status(400).json({
                success: false,
                message: "Error al actualizar lead",
                data: error
            });
        }
        else {
            new UpdateLeadUseCase(this.leadRepository).execute(updateLeadDto!).then(lead => {
                res.status(200).json({
                    success: true,
                    message: "Lead actualizado correctamente",
                    data: lead
                });
            }).catch(error => {
                this.logger.error("Error updating lead", { error: error }, "leadController");
                res.status(400).json({
                    success: false,
                    message: "Error al actualizar lead",
                    data: error
                });
            }
            );
        }
    }

    public deleteLead = (req: Request, res: Response) => {
        const id = req.params.id;
        new DeleteLeadUseCase(this.leadRepository).execute(id).then(lead => {
            res.status(200).json({
                success: true,
                message: "Lead eliminado correctamente",
                data: lead
            });
        }).catch(error => {
            this.logger.error("Error deleting lead", { error: error }, "leadController");
            res.status(400).json({
                success: false,
                message: "Error al eliminar lead",
                data: error
            });
        });
    }
}