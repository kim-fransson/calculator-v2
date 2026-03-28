export type Operator = '+' | '-' | '*' | '/';

export interface CalculatorState {
  /** Raw number string shown on display, e.g. "3.14" (not formatted with commas) */
  display: string;
  /** Left-hand operand stored when an operator is pressed */
  storedValue: string | null;
  /** The pending operator */
  operator: Operator | null;
  /** When true, the next digit replaces the display instead of appending */
  isNewEntry: boolean;
  /** Right-hand operand from the last EQUALS press, enables repeated-equals (5+3==→11) */
  lastOperand: string | null;
}

export type CalculatorAction =
  | { type: 'DIGIT'; payload: string }     // '0'–'9'
  | { type: 'DECIMAL' }
  | { type: 'OPERATOR'; payload: Operator }
  | { type: 'EQUALS' }
  | { type: 'DELETE' }
  | { type: 'RESET' };
