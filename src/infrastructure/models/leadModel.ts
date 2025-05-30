import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "leads"
    },
})
export class LeadModel {
    @prop({ required: true, trim: true })
    name!: string;

    @prop({ required: true, unique: true, lowercase: true, trim: true })
    email!: string;

    @prop({ trim: true })
    enterprise?: string;
    
    @prop({ trim: true })
    phone?: string;

    @prop({ enum: ["web", "mobile", "ecommerce", "marketing", "other"], trim: true })
    projectType?: string;

    @prop({ required: true, trim: true })
    objective!: string;

    @prop({ enum: ["1-3 meses", "3-6 meses", "6+ meses"] })
    terms?: string;

    @prop({ type: Number })
    budget?: number; // Mejor como número para cálculos

    @prop({ trim: true })
    description?: string; // Cambiado a opcional si no siempre se requiere

    @prop({
        enum: ["new", "contacted", "quoted", "negotiation", "won", "lost", "postponed"], 
        default: "new"
    })
    status?: string; // Cambiado de 'state' a 'status' (más común en CRMs)
}

export const leadModel = getModelForClass(LeadModel);