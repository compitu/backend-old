export class CreateTaskDto {
    readonly label: string;
    readonly done: boolean;
    readonly projectId: string;
    readonly due?: Date;
    readonly tags?: string[];
}
