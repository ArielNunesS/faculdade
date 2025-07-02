import { Command } from "./Command";
import { Light } from "./Light";

export class TurnOffLightCommand implements Command {
  constructor(private light: Light) {}

  execute() {
    this.light.turnOff();
  }

  undo() {
    this.light.turnOn();
  }
}