export class CreateTaskDto {
    readonly name: string;
    readonly done: boolean;
    readonly projectId: string;
    readonly due: Date;
    readonly tags: string[];
}
