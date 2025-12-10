import { tilesData } from "$lib";
import { Tile } from "./models/Tile";

export async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    return text.trim();
  } catch (e) {
    console.error('Failed to paste text:', e);
    return '';
  }
}

export async function copyToClipboard(text: string | undefined) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text successfully copied to clipboard');
  } catch (e) {
    console.error('Failed to copy text: ', e)
  }
}
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomCodeGenerator(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}

export function getImageSource(tile: () => Tile) {
  switch (tile().type) {
    case 'market':
      return {
        src: '/market.png',
        alt: 'market'
      }
    case 'utility':
      switch (tile().side) {
        case 'left':
          return {
            src: '/electricity_utility.png',
            alt: 'electricity_utility'
          };
        case 'top':
          return {
            src: '/water_utility.png',
            alt: 'water_utility'
          };
        default:
          return {
            src: '',
            alt: ''
          };
      }
    case 'chance':
      return {
        src: '/chance.png',
        alt: 'chance'
      }
    case 'fortune':
      return {
        src: '/fortune.png',
        alt: 'fortune'
      }
    case 'income_tax':
      return {
        src: '/income_tax.png',
        alt: 'income_tax'
      }
    case 'luxury_tax':
      return {
        src: '/luxury_tax.png',
        alt: 'luxury_tax'
      }
    case 'go_to_jail':
      return {
        src: '/go_to_jail.png',
        alt: 'go_to_jail'
      }
    case 'jail_visit':
      return {
        src: '/prison.png',
        alt: 'prison'
      }
    case 'rest_stop':
      return {
        src: '/rest_stop.png',
        alt: 'rest_stop'
      }
    default:
      return {
        src: '',
        alt: ''
      }
  }
}

export function getTiles(): Tile[] {
  return tilesData.map(t => {
    const style = getTileStyle(t.id - 1)
    return new Tile(
      t.id,
      t.name,
      t.type,
      t.color || null,
      t.price ?? null,
      t.rents ?? null,
      t.mortgage ?? null,
      t.house_cost ?? null,
      t.hotel_cost ?? null,
      style.row,
      style.col,
      style.side,
    )
  }).sort((a, b) => a.id - b.id)
}

export function getTileStyle(index: number) {
  if (index == 0) return { col: 11, row: 11, side: "corner-br" }
  if (index < 10) return { col: 11 - index, row: 11, side: "bottom" }
  if (index == 10) return { col: 1, row: 11, side: "corner-bl" }
  if (index < 20) return { col: 1, row: 11 - (index - 10), side: "left" }
  if (index == 20) return { col: 1, row: 1, side: "corner-tl" }
  if (index < 30) return { col: index - 19, row: 1, side: "top" }
  if (index == 30) return { col: 11, row: 1, side: "corner-tr" }
  return { col: 11, row: index - 29, side: "right" }
}
