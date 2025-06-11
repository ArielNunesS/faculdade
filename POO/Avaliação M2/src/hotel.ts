import { Entidade } from './entidade';
import { IReservavel } from './ireservavel';
import { Reserva } from './reserva';
import { perguntar } from './cli';

export class Hotel extends Entidade implements IReservavel {
  private reservas: Reserva[] = [];

  constructor(id: number, private nome: string, private cidade: string) {
    super(id);
  }

  adicionarReserva(reserva: Reserva): void {
    this.reservas.push(reserva);
  }

  listarReservas(): Reserva[] {
    return [...this.reservas];
  }

  exibirReservas(): void {
    console.log(`\nReservas no hotel ${this.nome}:`);
    this.reservas.forEach(reserva => console.log(reserva.toString()));
  }

  getNome(): string {
    return this.nome;
  }

  getCidade(): string {
    return this.cidade;
  }

  toString(): string {
    return `Hotel ${this.id}: ${this.nome} (${this.cidade})`;
  }

  static async cadastrar(hoteis: Hotel[]): Promise<void> {
    const nome = await perguntar('Nome do hotel: ');
    const cidade = await perguntar('Cidade do hotel: ');
    const id = hoteis.length > 0 ? Math.max(...hoteis.map(h => h.getId())) + 1 : 1;
    const novoHotel = new Hotel(id, nome, cidade);
    hoteis.push(novoHotel);
    console.log('Hotel cadastrado com sucesso!');
  }

  static fromString(linha: string): Hotel | null {
    const match = linha.match(/Hotel (\d+): (.+) \((.+)\)/);
    if (!match) return null;
    const id = parseInt(match[1]);
    const nome = match[2];
    const cidade = match[3];
    return new Hotel(id, nome, cidade);
  }
}