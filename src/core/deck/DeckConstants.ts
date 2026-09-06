import { CardColour } from "../card/CardColour";

type NumberCardValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type NumberCardValueCount = Record<NumberCardValue, number>;
type NumberCardColourValue = Record<
  Exclude<CardColour, CardColour.Wild>,
  NumberCardValueCount
>;

export const CARD_SELECTION_TABLE: NumberCardColourValue = {
  [CardColour.Red]: {
    0: 1,
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 2,
    8: 2,
    9: 2,
  },
  [CardColour.Blue]: {
    0: 1,
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 2,
    8: 2,
    9: 2,
  },
  [CardColour.Yellow]: {
    0: 1,
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 2,
    8: 2,
    9: 2,
  },
  [CardColour.Green]: {
    0: 1,
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 2,
    8: 2,
    9: 2,
  },
};
