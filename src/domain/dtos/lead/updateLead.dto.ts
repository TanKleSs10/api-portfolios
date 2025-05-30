import { regularExps } from "../../../config/regular-exp";

export class UpdateLeadDto {
    constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly email?: string,
        public readonly phone?: string,
        public readonly enterprise?: string,
        public readonly projectType?: string,
        public readonly objective?: string,
        public readonly terms?: string,
        public readonly budget?: number,
        public readonly description?: string,
        public readonly status?: "new" | "contacted" | "quoted" | "won" | "lost"
    ) {}

    get values(): { [key: string]: any } {
        const returnObj: { [key: string]: any } = {};
        
        if (this.name) returnObj.name = this.name;
        if (this.email) returnObj.email = this.email;
        if (this.phone) returnObj.phone = this.phone;
        if (this.enterprise) returnObj.enterprise = this.enterprise;
        if (this.projectType) returnObj.projectType = this.projectType;
        if (this.objective) returnObj.objective = this.objective;
        if (this.terms) returnObj.terms = this.terms;
        if (this.budget) returnObj.budget = this.budget;
        if (this.description) returnObj.description = this.description;
        if (this.status) returnObj.status = this.status;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string | undefined, UpdateLeadDto | undefined] {
        const {
            id,
            name,
            email,
            phone,
            enterprise,
            projectType,
            objective,
            terms,
            budget,
            description,
            status
        } = props;

        // Validación de ID requerido
        if (!id) {
            return ["Invalid lead ID", undefined];
        }

        // Validación de que al menos un campo sea proporcionado
        if (!name && !email && !phone && !enterprise && !projectType && 
            !objective && !terms && budget === undefined && !description && !status) {
            return ["At least one field must be provided for update", undefined];
        }

        // Validación de email si es proporcionado
        if (email && !regularExps.email.test(email)) {
            return ["Invalid email format", undefined];
        }

        // Validación de teléfono si es proporcionado
        if (phone && !regularExps.phone.test(phone)) {
            return ["Phone must be between 7-20 digits and may include + - ( )", undefined];
        }

        // Validación de presupuesto si es proporcionado
        if (budget !== undefined && (isNaN(Number(budget)) || Number(budget) < 0)) {
            return ["Budget must be a positive number", undefined];
        }

        // Validación de status si es proporcionado
        const validStatuses = ["new", "contacted", "quoted", "won", "lost"];
        if (status && !validStatuses.includes(status)) {
            return [`Invalid status. Must be one of: ${validStatuses.join(", ")}`, undefined];
        }

        return [
            undefined, 
            new UpdateLeadDto(
                id,
                name?.trim(),
                email?.toLowerCase().trim(),
                phone?.trim(),
                enterprise?.trim(),
                projectType,
                objective,
                terms,
                budget ? Number(budget) : undefined,
                description,
                status
            )
        ];
    }
}