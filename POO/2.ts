class Hotel {
    constructor(public nome: string) {}
}

class Quarto {
  constructor(public numero: number, public andar: number) {}
}

class Pessoa {
  constructor(public nome: string) {}
}

class Funcionario extends Pessoa {
  constructor(nome: string, public salario: number) {
    super(nome);
  }

  mudarSalario(novoSalario: number): void {
    this.salario = novoSalario;
  }
}

class Cargo {
  constructor(public nome: string) {}
}

class Hospede extends Pessoa {
  constructor(nome: string, public endereco: string, public documento: string) {
    super(nome);
  }
}

class Veiculo {
  constructor(public placa: string, public modelo: string) {}
}

class Reserva {
  hospedes: Hospede[] = [];
  veiculo?: Veiculo;

  constructor(
    public dataEntrada: string,
    public dataSaida: string
  ) {}

  checkin(hospedes: Hospede[]): void {
    this.hospedes = hospedes;
  }

  checkout(): void {
    this.hospedes = [];
    console.log("Reserva finalizada");
  }

  cancelar(): void {
    this.hospedes = [];
    console.log("Reserva cancelada");
  }
}
