// hotel-sistema.ts
import readline from 'readline';
import fs from 'fs';
import path from 'path';

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

  getTelefone(): string {
    return this.telefone;
  }

  static async cadastrar(hoteis: Hotel[]): Promise<void> {
    const nome = await perguntar('Digite o nome do hotel: ');

    
    const hotelExistente = hoteis.find(hotel => hotel.getNome() == nome);
      if(hotelExistente){
        console.log('Já existe um hotel com esse nome, por favor insira um nome difserente.');
        return;
      }
    

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

// transformar em string para salvar posteriormente
  toString(): string {
    return `HOTEL|${this.id}|${this.nome}|${this.telefone}`;
  }

  // Para desserialização
  static fromString(linha: string): Hotel | null {
    const partes = linha.split('|');
    if (partes[0] !== 'HOTEL' || partes.length !== 4) return null;
    return new Hotel(parseInt(partes[1]), partes[2], partes[3]);
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

  // Função auxiliar para validar data (dia entre 1-30, mês entre 1-12)
  static validarData(data: string): boolean {
    // Verificar formato dd/mm
    if (!/^\d{2}\/\d{2}$/.test(data)) return false;
    
    const [diaStr, mesStr] = data.split('/');
    const dia = parseInt(diaStr);
    const mes = parseInt(mesStr);
    
    // Verificar se dia está entre 1 e 30
    if (dia < 1 || dia > 30) return false;
    
    // Verificar se mês está entre 1 e 12
    if (mes < 1 || mes > 12) return false;
    
    return true;
  }
  
  // Função auxiliar para comparar datas (retorna true se data1 é anterior a data2)
  static dataEhAnterior(data1: string, data2: string): boolean {
    const [dia1, mes1] = data1.split('/').map(Number);
    const [dia2, mes2] = data2.split('/').map(Number);
    
    if (mes1 < mes2) return true;
    if (mes1 > mes2) return false;
    return dia1 < dia2;
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
    
    // Validar data de entrada
    do {
      diaEntrada = await perguntar('Data de entrada (dd/mm) [dia: 1-30, mês: 1-12]: ');
      if (!this.validarData(diaEntrada)) {
        console.log('Data inválida. O dia deve estar entre 1-30 e o mês entre 1-12.');
        continue;
      }
      break;
    } while (true);
    
    // Validar data de saída (deve ser posterior à data de entrada)
    do {
      diaSaida = await perguntar('Data de saída (dd/mm) [dia: 1-30, mês: 1-12]: ');
      if (!this.validarData(diaSaida)) {
        console.log('Data inválida. O dia deve estar entre 1-30 e o mês entre 1-12.');
        continue;
      }
      
      // Verificar se a data de saída é posterior à data de entrada
      if (!this.dataEhAnterior(diaEntrada, diaSaida)) {
        console.log('A data de saída deve ser posterior à data de entrada.');
        continue;
      }
      
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

  // transformar em string para salvar posteriormente
  toString(): string {
    return `RESERVA|${this.id}|${this.idHotel}|${this.nomeResponsavel}|${this.diaEntrada}|${this.diaSaida}`;
  }

  // Para desserialização
  static fromString(linha: string): Reserva | null {
    const partes = linha.split('|');
    if (partes[0] !== 'RESERVA' || partes.length !== 6) return null;
    return new Reserva(
      parseInt(partes[1]), 
      parseInt(partes[2]), 
      partes[3], 
      partes[4], 
      partes[5]
    );
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

  // transformar em string para salvar posteriormente
  toString(): string {
    return `PESSOA|${this.nomeResponsavel}`;
  }

  // Para desserialização
  static fromString(linha: string): Pessoa | null {
    const partes = linha.split('|');
    if (partes[0] !== 'PESSOA' || partes.length !== 2) return null;
    return new Pessoa(partes[1]);
  }
}

// Funções para persistência de dados
const DIRETORIO_DADOS = './dados';

// Função para criar diretório de dados se não existir
function inicializarDiretorio(): void {
  if (!fs.existsSync(DIRETORIO_DADOS)) {
    fs.mkdirSync(DIRETORIO_DADOS, { recursive: true });
    console.log('Diretório de dados criado.');
  }
}

// Função para obter o próximo número de arquivo
function obterProximoNumeroArquivo(): number {
  inicializarDiretorio();
  
  // Ler arquivos existentes no diretório
  const arquivos = fs.readdirSync(DIRETORIO_DADOS)
    .filter(arquivo => arquivo.startsWith('dados_') && arquivo.endsWith('.txt'))
    .map(arquivo => {
      const match = arquivo.match(/dados_(\d+)\.txt/);
      return match ? parseInt(match[1]) : 0;
    })
    .filter(num => !isNaN(num));
  
  if (arquivos.length === 0) return 1;
  return Math.max(...arquivos) + 1;
}

// Função para obter o nome do último arquivo de dados
function obterUltimoArquivo(): string | null {
  inicializarDiretorio();
  
  const arquivos = fs.readdirSync(DIRETORIO_DADOS)
    .filter(arquivo => arquivo.startsWith('dados_') && arquivo.endsWith('.txt'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/dados_(\d+)\.txt/)?.[1] || '0');
      const numB = parseInt(b.match(/dados_(\d+)\.txt/)?.[1] || '0');
      return numB - numA; // Ordem decrescente
    });
  
  if (arquivos.length === 0) return null;
  return path.join(DIRETORIO_DADOS, arquivos[0]);
}

// Função para salvar dados em um novo arquivo
function salvarDados(hoteis: Hotel[], reservas: Reserva[], pessoas: Pessoa[]): void {
  inicializarDiretorio();
  
  const numeroArquivo = obterProximoNumeroArquivo();
  const nomeArquivo = path.join(DIRETORIO_DADOS, `dados_${numeroArquivo}.txt`);
  
  const linhas: string[] = [];
  
  // Adicionar cabeçalho com data e hora
  linhas.push(`# SISTEMA DE HOTEL - DADOS SALVOS EM ${new Date().toLocaleString()}`);
  linhas.push('');
  
  // Adicionar hotéis
  linhas.push('## HOTÉIS');
  hoteis.forEach(hotel => linhas.push(hotel.toString()));
  linhas.push('');
  
  // Adicionar reservas
  linhas.push('## RESERVAS');
  reservas.forEach(reserva => linhas.push(reserva.toString()));
  linhas.push('');
  
  // Adicionar pessoas
  linhas.push('## PESSOAS');
  pessoas.forEach(pessoa => linhas.push(pessoa.toString()));
  
  try {
    fs.writeFileSync(nomeArquivo, linhas.join('\n'));
    console.log(`Dados salvos no arquivo: ${nomeArquivo}`);
  } catch (erro) {
    console.error('Erro ao salvar dados:', erro);
  }
}

// Função para carregar dados do último arquivo
function carregarDados(hoteis: Hotel[], reservas: Reserva[], pessoas: Pessoa[]): void {
  const ultimoArquivo = obterUltimoArquivo();
  if (!ultimoArquivo) {
    console.log('Nenhum arquivo de dados encontrado. Iniciando com dados vazios.');
    return;
  }
  
  try {
    const conteudo = fs.readFileSync(ultimoArquivo, 'utf8');
    const linhas = conteudo.split('\n').filter(linha => linha.trim() !== '' && !linha.startsWith('#'));
    
    let secaoAtual = '';
    
    linhas.forEach(linha => {
      if (linha.startsWith('## ')) {
        secaoAtual = linha.substring(3);
        return;
      }
      
      switch (secaoAtual) {
        case 'HOTÉIS':
          const hotel = Hotel.fromString(linha);
          if (hotel) hoteis.push(hotel);
          break;
        case 'RESERVAS':
          const reserva = Reserva.fromString(linha);
          if (reserva) {
            reservas.push(reserva);
            const hotel = hoteis.find(h => h.getId() === reserva.getIdHotel());
            if (hotel) hotel.adicionarReserva(reserva);
          }
          break;
        case 'PESSOAS':
          const pessoa = Pessoa.fromString(linha);
          if (pessoa) pessoas.push(pessoa);
          break;
      }
    });
    
    // Associar reservas às pessoas
    reservas.forEach(reserva => {
      const pessoa = pessoas.find(p => p.getNome() === reserva.getNomeResponsavel());
      if (pessoa) pessoa.adicionarReserva(reserva);
    });
    
    console.log(`Dados carregados do arquivo: ${ultimoArquivo}`);
    console.log(`${hoteis.length} hotéis, ${reservas.length} reservas, ${pessoas.length} pessoas`);
  } catch (erro) {
    console.error('Erro ao carregar dados:', erro);
  }
}

// Dados armazenados em memória
const hoteis: Hotel[] = [];
const reservas: Reserva[] = [];
const pessoas: Pessoa[] = [];

// Execução principal
async function main() {
  console.log("=== SISTEMA DE GERENCIAMENTO DE HOTEL ===");
  
  // Carregar dados do último arquivo
  carregarDados(hoteis, reservas, pessoas);
  
  let continuar = true;
  while (continuar) {
    const opcao = await perguntar('\nEscolha uma opção: \nh (hotel), \nr (reserva), \ni (info hotel), \nir (info reserva), \nip (info pessoa), \ns (sair): ');
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
  
  // Salvar dados em um novo arquivo antes de sair
  salvarDados(hoteis, reservas, pessoas);
  console.log("Dados salvos. Encerrando programa...");
  
  fecharEntrada();
}

main();