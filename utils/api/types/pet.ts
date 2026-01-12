export interface Pet {
    id: number;
    name: string;
    photoUrls: string[];
    category: NamedEntity[];
    status: string;
    tags: NamedEntity[];
}

export interface NamedEntity {
    id?: number;
    name?: string;
}