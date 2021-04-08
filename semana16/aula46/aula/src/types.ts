export enum POKE_TYPES {
   BUG = "BUG",
   DARK = "DARK",
   DRAGON = "DRAGON",
   ELECTRIC = "ELECTRIC",
   FIGHTING = "FIGHTING",
   FIRE = "FIRE",
   FLYING = "FLYING",
   GHOST = "GHOST",
   GRASS = "GRASS",
   GROUND = "GROUND",
   ICE = "ICE",
   NORMAL = "NORMAL",
   POISON = "POISON",
   PSYCHIC = "PSYCHIC",
   ROCK = "ROCK",
   STEEL = "STEEL",
   WATER = "WATER"
}

export type Pokemon = {
   id: number,
   name: string,
   type: POKE_TYPES
}