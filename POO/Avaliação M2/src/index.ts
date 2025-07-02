import * as readline from 'readline';
import { Light } from './Light';
import { RemoteControl } from './RemoteControl'
import { TurnOnLightCommand } from './TurnOnLightCommand'
import { TurnOffLightCommand } from './TurnOffLightCommand'

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
