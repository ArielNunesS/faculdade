// 1. Command Interface
export interface Command {
  execute(): void;
  undo(): void;
}