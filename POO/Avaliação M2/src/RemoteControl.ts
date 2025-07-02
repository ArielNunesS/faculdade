import { Command } from "./Command";

// 4. Invoker - Controle remoto
export class RemoteControl {
  private history: Command[] = [];

  pressButton(command: Command) {
    command.execute();
    this.history.push(command);
  }

  pressUndo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    } else {
      console.log("❗ Nada para desfazer.");
    }
  }
}