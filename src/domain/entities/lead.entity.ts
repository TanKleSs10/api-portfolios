export class LeadEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone: string,
        public enterprise?: string,
        public projectType?: "web" | "mobile" | "ecommerce" | "marketing" | "other",
        public objective?: string,
        public terms?: "1-3 meses" | "3-6 meses" | "6+ meses",
        public budget?: number,
        public description?: string,
        public status: "new" | "contacted" | "quoted" | "won" | "lost" = "new",
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}

    public static fromObject(obj: any): LeadEntity {
        const {
            id,
            _id,
            name,
            email,
            phone,
            enterprise,
            projectType,
            objective,
            terms,
            budget,
            description,
            status = "new",
            createdAt,
            updatedAt,
        } = obj;

        // Validaciones básicas
        if (!name || !email || !phone) {
            throw new Error("Missing required fields: name, email, phone");
        }

        return new LeadEntity(
            (_id || id)?.toString(),
            name,
            email,
            phone,
            enterprise,
            projectType,
            objective,
            terms,
            budget ? Number(budget) : undefined,
            description,
            status,
            createdAt ? new Date(createdAt) : undefined,
            updatedAt ? new Date(updatedAt) : undefined
        );
    }
}