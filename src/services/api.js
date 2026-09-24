import menuData from '../data/menu.json'
import specialsData from '../data/specials.json'

export async function getMenu() {
  return menuData
}

export async function getSpecials() {
  return specialsData
}
