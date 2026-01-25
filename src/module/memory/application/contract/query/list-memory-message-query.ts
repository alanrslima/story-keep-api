import { PaginationInput, PaginationOutput } from "../../../../common";

export interface ListMemoryMessageQuery {
  execute(
    input: ListMemoryMessageQueryInput,
  ): Promise<ListMemoryMessageQueryOutput>;
}

export interface ListMemoryMessageQueryInput extends PaginationInput {
  memoryId: string;
}

export interface ListMemoryMessageQueryOutput extends PaginationOutput<{
  user: {
    name: string;
    profileUrl: string;
  };
  message: string;
  createdAt: Date;
}> {}
