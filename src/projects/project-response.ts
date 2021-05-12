export interface ProjectsResponse {
    builtIn: ProjectResponse[];
    userProjects: ProjectResponse[];
}

export interface ProjectResponse {
    id: string;
    name: string;
    icon?: string;
    colorId?: string;
}
