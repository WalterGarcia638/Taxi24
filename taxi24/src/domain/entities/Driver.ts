export class Driver {
    constructor(
      public id: number,
      public name: string,
      public latitude: number,
      public longitude: number,
      public status: 'available' | 'unavailable' = 'available',
    ) {}
  }
  