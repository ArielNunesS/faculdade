import * as readline from 'readline';

// 1. Command Interface
interface Command {
  execute(): void;
  undo(): void;
}

// 2. Receiver - Lógica real
class Light {
  turnOn() {
    console.log("💡 Luz ligada");
  }

  turnOff() {
    console.log("💡 Luz desligada");
  }
}

// 3. Comandos concretos
class TurnOnLightCommand implements Command {
  constructor(private light: Light) {}

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}

class TurnOffLightCommand implements Command {
  constructor(private light: Light) {}

  execute() {
    this.light.turnOff();
  }

  undo() {
    this.light.turnOn();
  }
}

// 4. Invoker - Controle remoto
class RemoteControl {
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

// 5. Client - Configura tudo
const light = new Light();
const remote = new RemoteControl();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Digite um comando: 'on', 'off', 'undo' ou 'exit'");

function promptUser() {
  rl.question("> ", (input) => {
    const commandStr = input.trim().toLowerCase();

    switch (commandStr) {
      case 'on':
        remote.pressButton(new TurnOnLightCommand(light));
        break;
      case 'off':
        remote.pressButton(new TurnOffLightCommand(light));
        break;
      case 'undo':
        remote.pressUndo();
        break;
      case 'exit':
        console.log("Encerrando...");
        rl.close();
        return;
      default:
        console.log("Comando inválido. Use: 'on', 'off', 'undo', 'exit'");
    }

    promptUser(); // loop
  });
}

promptUser();
