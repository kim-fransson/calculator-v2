import type { CalculatorState, CalculatorAction, Operator } from './types';

export const OPERATOR_DISPLAY: Record<Operator, string> = {
  '+': '+', '-': '−', '*': '×', '/': '÷',
};

export const INITIAL_STATE: CalculatorState = {
  display: '0',
  storedValue: null,
  operator: null,
  isNewEntry: false,
  lastOperand: null,
  expression: '',
};

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case 'DIGIT': {
      if (state.isNewEntry) {
        return { ...state, display: action.payload, isNewEntry: false };
      }
      if (state.display === '0') {
        return action.payload === '0' ? state : { ...state, display: action.payload };
      }
      return { ...state, display: state.display + action.payload };
    }

    case 'DECIMAL': {
      if (state.isNewEntry) {
        return { ...state, display: '0.', isNewEntry: false };
      }
      if (state.display.includes('.')) return state;
      return { ...state, display: state.display + '.' };
    }

    case 'OPERATOR': {
      // If there's a pending operation and the user hasn't started a new entry, compute first
      if (state.storedValue !== null && state.operator !== null && !state.isNewEntry) {
        const result = compute(state.storedValue, state.display, state.operator);
        return {
          ...state,
          display: '0',
          storedValue: result,
          operator: action.payload,
          isNewEntry: true,
          lastOperand: null,
          expression: state.expression + OPERATOR_DISPLAY[state.operator] + ' ' + formatDisplay(state.display) + ' ',
        };
      }
      // First operator, or changing mind (isNewEntry=true): seed expression with current display if empty
      return {
        ...state,
        display: '0',
        storedValue: state.display,
        operator: action.payload,
        isNewEntry: true,
        lastOperand: null,
        expression: state.expression || formatDisplay(state.display) + ' ',
      };
    }

    case 'EQUALS': {
      if (state.operator === null) return state;
      // Repeated equals: use lastOperand if storedValue is null
      const rhs = state.storedValue === null ? state.lastOperand! : state.display;
      const lhs = state.storedValue === null ? state.display : state.storedValue;
      const result = compute(lhs, rhs, state.operator);
      return {
        ...state,
        display: result,
        storedValue: null,
        operator: null,
        isNewEntry: true,
        lastOperand: rhs,
        expression: '',
      };
    }

    case 'DELETE': {
      if (state.isNewEntry) return state;
      if (state.display === '0') return state;
      if (state.display.length === 1) return { ...state, display: '0' };
      return { ...state, display: state.display.slice(0, -1) };
    }

    case 'RESET':
      return INITIAL_STATE;
  }
}

function compute(lhs: string, rhs: string, operator: CalculatorAction & { type: 'OPERATOR' } extends never ? never : string): string {
  const a = parseFloat(lhs);
  const b = parseFloat(rhs);
  let result: number;
  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/':
      if (b === 0) return 'Error';
      result = a / b;
      break;
    default: return lhs;
  }
  // Avoid floating-point noise by using toPrecision then trimming trailing zeros
  return parseFloat(result.toPrecision(12)).toString();
}

export function formatDisplay(value: string): string {
  if (!/^-?\d/.test(value)) return value;
  const [integer, decimal] = value.split('.');
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal !== undefined ? `${formatted}.${decimal}` : formatted;
}
