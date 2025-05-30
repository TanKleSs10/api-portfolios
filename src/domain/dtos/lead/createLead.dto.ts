import { regularExps } from "../../../config/regular-exp";

export class CreateLeadDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly description: string,
        public readonly phone?: string,
        public readonly enterprise?: string,
        public readonly projectType?: string,
        public readonly objective?: string,
        public readonly terms?: string,
        public readonly budget?: number,
        public readonly honeypot?: string
    ) {}

    static create(props: { [key: string]: any }): [string | undefined, CreateLeadDto | undefined] {
        const {
            name,
            email,
            phone,
            enterprise,
            projectType,
            objective,
            terms,
            budget,
            description,
            honeypot
        } = props;

        // Validaciones básicas de campos requeridos
        if (!name || !email || description) {
            return ["Invalid lead", undefined];
        }

        // Validación de formato de email
        if (!regularExps.email.test(email)) {
            return ["Invalid email format", undefined];
        }

        // Validación de teléfono (si existe)
        if (phone && !regularExps.phone.test(phone)) {
            return ["Phone must be between 7-20 digits and may include + - ( )", undefined];
        }

        // Validación de presupuesto (si existe)
        if (budget && (isNaN(Number(budget))) || Number(budget) < 0) {
            return ["Budget must be a positive number", undefined];
        }

        // Validación de enterprise (si existe)
        if (enterprise && typeof enterprise !== 'string') {
            return ["Invalid enterprise format", undefined];
        }

        // Validación de description (si existe)
        if (description && typeof description !== 'string') {
            return ["Invalid description format", undefined];
        }

        if (honeypot && honeypot.trim() !== '') {
            return ["Invalid request: spam detected", undefined];
        }

        return [
            undefined, 
            new CreateLeadDto(
                name.trim(),
                email.toLowerCase().trim(),
                phone?.trim(),
                enterprise?.trim(),
                projectType,
                objective,
                terms,
                budget ? String(Number(budget)) : undefined,
                description
            )
        ];
    }
}