export abstract class Entidade {
    constructor(protected id: number) {}
  
    getId(): number {
      return this.id;
    }
  }