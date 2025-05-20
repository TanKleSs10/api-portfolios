export class QueryParamsDto {
    constructor(
      public readonly portfolioType: "quantum-md" | "personal",
      public readonly tags: string[],
      public readonly page: number,
      public readonly search: string,
      public readonly limit: number
    ) {}
  
    static create(query: { [key: string]: any }): [string | undefined, QueryParamsDto | undefined] {
      let { portfolioType, tags, page, search, limit } = query;
  
      // portfolioType validation
      if (portfolioType && portfolioType !== "quantum-md" && portfolioType !== "personal") {
        return ["portfolioType must be 'quantum-md' or 'personal'", undefined];
      }
  
      // tags normalization
      let parsedTags: string[] = [];
      if (tags) {
        if (Array.isArray(tags)) {
          parsedTags = tags.map(String);
        } else if (typeof tags === "string") {
          parsedTags = tags.split(",").map(tag => tag.trim());
        } else if (typeof tags === "object") {
          parsedTags = Object.values(tags).map(String);
        } else {
          return ["tags must be a string, array, or object", undefined];
        }
      }
  
      // page and limit parsing
      page = page ? Number(page) : 1;
      limit = limit ? Number(limit) : 10;
  
      if (isNaN(page) || page < 1) return ["page must be a number greater than 0", undefined];
      if (isNaN(limit) || limit < 1) return ["limit must be a number greater than 0", undefined];
  
      // search normalization
      search = typeof search === "string" ? search : "";
  
      return [
        undefined,
        new QueryParamsDto(
          portfolioType as "quantum-md" | "personal",
          parsedTags,
          page,
          search,
          limit
        ),
      ];
    }
  }  