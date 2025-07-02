import { Command } from "./Command";
import { Light } from "./Light";

// 3. Comandos concretos
export class TurnOnLightCommand implements Command {
  constructor(private light: Light) {}

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}