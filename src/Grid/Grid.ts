import { Vec } from '../Vec/Vec.js';
import { CoordTransformer } from './CoordTransformer.js';

export class Grid extends CoordTransformer {
  private readonly _background: string;
  private readonly _grid: string[];

  constructor(width: number, height: number, background = '⬛') {
    super(width, height);
    this._background = background;
    this._grid = new Array<string>(width * height);
    this._grid.fill(background);
  }

  public at(vec: Vec): string {
    return this._grid[this.index(vec)] || '';
  }

  public set(vec: Vec, value: string): string {
    if (this.inbounds_tf(vec)) {
      const val = this._grid[this.index(vec)]!;
      this._grid[this.index(vec)] = value;
      return val;
    } else {
      return '';
    }
  }

  public reset(): string[] {
    const prevFrame = this._grid;
    this._grid.fill(this._background);
    return prevFrame;
  }

  public fill(val = this._background): string[] {
    const prevFrame = this._grid;
    this._grid.fill(val);
    return prevFrame;
  }

  public render(): string {
    const rows: string[] = [];
    for (let i = 0; i < this._grid.length; i += this._width) rows.push(this._grid.slice(i, i + this._width).join(''));
    return rows.join('\n');
  }
}