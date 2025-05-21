// hotel-sistema.ts
import readline from 'readline';

// Utilitário para entrada via terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(pergunta: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(pergunta, resposta => {
      resolve(resposta);
    });
  });
}

function fecharEntrada() {
  rl.close();
}

// Interfaces e classes principais
interface IReservavel {
  adicionarReserva(reserva: Reserva): void;
  listarReservas(): Reserva[];
}

abstract class Entidade {
  constructor(protected id: number) {}

  getId(): number {
    return this.id;
  }
}

class Hotel extends Entidade implements IReservavel {
  private reservasDoHotel: Reserva[] = [];

  constructor(
    id: number,
    private nome: string,
    private telefone: string
  ) {
    super(id);
  }

  adicionarReserva(reserva: Reserva): void {
    this.reservasDoHotel.push(reserva);
  }

  listarReservas(): Reserva[] {
    return this.reservasDoHotel;
  }

  getNome(): string {
    return this.nome;
  }

  static async cadastrar(hoteis: Hotel[]): Promise<void> {
    const nome = await perguntar('Digite o nome do hotel: ');

    let id: number;
    do {
      const idStr = await perguntar('Crie uma ID de 5 dígitos para seu hotel: ');
      if (/^\d{5}$/.test(idStr)) {
        id = parseInt(idStr);
        break;
      } else {
        console.log('ID inválido, tente novamente.');
      }
    } while (true);

    let telefone: string;
    do {
      telefone = await perguntar('Digite o telefone (99 99999-9999): ');
      if (/^\d{2} \d{5}-\d{4}$/.test(telefone)) break;
      console.log('Telefone inválido, tente novamente.');
    } while (true);

    const hotel = new Hotel(id, nome, telefone);
    hoteis.push(hotel);
    console.log(`Hotel "${nome}" cadastrado com sucesso.`);
  }

  exibirReservas(): void {
    console.log(`Reservas do hotel ${this.getNome()}:`);
    this.listarReservas().forEach(r => console.log(r.getResumo()));
  }
}

class Reserva extends Entidade {
  constructor(
    id: number,
    private idHotel: number,
    private nomeResponsavel: string,
    private diaEntrada: string,
    private diaSaida: string
  ) {
    super(id);
  }

  getResumo(): string {
    return `${this.nomeResponsavel} | Entrada: ${this.diaEntrada} | Saída: ${this.diaSaida}`;
  }

  getIdHotel(): number {
    return this.idHotel;
  }

  getIdReserva(): number {
    return this.id;
  }

  getNomeResponsavel(): string {
    return this.nomeResponsavel;
  }

  static async cadastrar(hoteis: Hotel[], reservas: Reserva[], pessoas: Pessoa[]): Promise<void> {
    const nomeHotel = await perguntar('Digite o nome do hotel para reserva: ');
    const hotel = hoteis.find(h => h.getNome() === nomeHotel);
    if (!hotel) {
      console.log('Hotel não encontrado.');
      return;
    }

    const nomeResponsavel = await perguntar('Nome do responsável: ');

    let diaEntrada: string, diaSaida: string;
    do {
      diaEntrada = await perguntar('Data de entrada (dd/mm): ');
      if (!/^\d{2}\/\d{2}$/.test(diaEntrada)) continue;
      diaSaida = await perguntar('Data de saída (dd/mm): ');
      if (!/^\d{2}\/\d{2}$/.test(diaSaida)) continue;
      break;
    } while (true);

    const idReserva = Math.floor(Math.random() * 90000) + 10000;
    const reserva = new Reserva(idReserva, hotel.getId(), nomeResponsavel, diaEntrada, diaSaida);

    reservas.push(reserva);
    hotel.adicionarReserva(reserva);

    let pessoa = pessoas.find(p => p.getNome() === nomeResponsavel);
    if (!pessoa) {
      pessoa = new Pessoa(nomeResponsavel);
      pessoas.push(pessoa);
    }
    pessoa.adicionarReserva(reserva);

    console.log(`Reserva criada com sucesso. ID: ${idReserva}`);
  }

  exibirInfo(): void {
    console.log(`Reserva ID ${this.getIdReserva()}: ${this.getResumo()}`);
  }
}

class Pessoa {
  private reservasPessoa: Reserva[] = [];

  constructor(private nomeResponsavel: string) {}

  adicionarReserva(reserva: Reserva): void {
    this.reservasPessoa.push(reserva);
  }

  getReservas(): Reserva[] {
    return this.reservasPessoa;
  }

  getNome(): string {
    return this.nomeResponsavel;
  }

  exibirReservas(): void {
    console.log(`Reservas de ${this.getNome()}:`);
    this.getReservas().forEach(r => console.log(r.getResumo()));
  }
}

// Dados armazenados em memória
const hoteis: Hotel[] = [];
const reservas: Reserva[] = [];
const pessoas: Pessoa[] = [];

// Execução principal
async function main() {
  let continuar = true;
  while (continuar) {
    const opcao = await perguntar('\nEscolha uma opção: h (hotel), r (reserva), i (info hotel), ir (info reserva), ip (info pessoa), s (sair): ');
    switch (opcao) {
      case 'h': await Hotel.cadastrar(hoteis); break;
      case 'r': await Reserva.cadastrar(hoteis, reservas, pessoas); break;
      case 'i': {
        const idStr = await perguntar('Digite o ID do hotel: ');
        const id = parseInt(idStr);
        const hotel = hoteis.find(h => h.getId() === id);
        if (hotel) hotel.exibirReservas();
        else console.log('Hotel não encontrado.');
        break;
      }
      case 'ir': {
        const idStr = await perguntar('Digite o ID da reserva: ');
        const id = parseInt(idStr);
        const reserva = reservas.find(r => r.getIdReserva() === id);
        if (reserva) reserva.exibirInfo();
        else console.log('Reserva não encontrada.');
        break;
      }
      case 'ip': {
        const nome = await perguntar('Digite o nome da pessoa: ');
        const pessoa = pessoas.find(p => p.getNome() === nome);
        if (pessoa) pessoa.exibirReservas();
        else console.log('Pessoa não encontrada.');
        break;
      }
      case 's': continuar = false; break;
      default: console.log('Opção inválida.');
    }
  }
  fecharEntrada();
}

main();
