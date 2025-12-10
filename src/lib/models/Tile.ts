export class Tile {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public color: string | null,
    public price: number | null,
    public rents: number[] | null,
    public mortgage: number | null,
    public house_cost: number | null,
    public hotel_cost: number | null,
    public row: number | null,
    public col: number | null,
    public side: string | null,
  ) { }
}
