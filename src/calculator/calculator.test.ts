import { describe, it, expect } from 'vitest';
import { INITIAL_STATE, calculatorReducer, formatDisplay } from './calculator';
import type { CalculatorState } from './types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function dispatch(state: CalculatorState, ...actions: Parameters<typeof calculatorReducer>[1][]) {
  return actions.reduce((s, a) => calculatorReducer(s, a), state);
}

// ---------------------------------------------------------------------------
// INITIAL_STATE
// ---------------------------------------------------------------------------

describe('INITIAL_STATE', () => {
  it('has display "0"', () => {
    expect(INITIAL_STATE.display).toBe('0');
  });

  it('has storedValue null', () => {
    expect(INITIAL_STATE.storedValue).toBeNull();
  });

  it('has operator null', () => {
    expect(INITIAL_STATE.operator).toBeNull();
  });

  it('has isNewEntry false', () => {
    expect(INITIAL_STATE.isNewEntry).toBe(false);
  });

  it('has lastOperand null', () => {
    expect(INITIAL_STATE.lastOperand).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// calculatorReducer — DIGIT
// ---------------------------------------------------------------------------

describe('calculatorReducer — DIGIT action', () => {
  it('replaces "0" with the first non-zero digit', () => {
    const state = dispatch(INITIAL_STATE, { type: 'DIGIT', payload: '5' });
    expect(state.display).toBe('5');
  });

  it('keeps display "0" when "0" is pressed while display is "0"', () => {
    const state = dispatch(INITIAL_STATE, { type: 'DIGIT', payload: '0' });
    expect(state.display).toBe('0');
  });

  it('appends digit to an existing non-zero display', () => {
    const state = dispatch(INITIAL_STATE,
      { type: 'DIGIT', payload: '5' },
      { type: 'DIGIT', payload: '3' },
    );
    expect(state.display).toBe('53');
  });

  it('starts a fresh number when isNewEntry is true', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '8', isNewEntry: true };
    const state = dispatch(base, { type: 'DIGIT', payload: '4' });
    expect(state.display).toBe('4');
  });

  it('sets isNewEntry to false after the first digit of a new entry', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '8', isNewEntry: true };
    const state = dispatch(base, { type: 'DIGIT', payload: '4' });
    expect(state.isNewEntry).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// calculatorReducer — DECIMAL
// ---------------------------------------------------------------------------

describe('calculatorReducer — DECIMAL action', () => {
  it('appends decimal point to an integer display', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '5' };
    const state = dispatch(base, { type: 'DECIMAL' });
    expect(state.display).toBe('5.');
  });

  it('does not add a second decimal point', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '5.3' };
    const state = dispatch(base, { type: 'DECIMAL' });
    expect(state.display).toBe('5.3');
  });

  it('produces "0." from the initial state', () => {
    const state = dispatch(INITIAL_STATE, { type: 'DECIMAL' });
    expect(state.display).toBe('0.');
  });

  it('produces "0." when isNewEntry is true (e.g. after an operator)', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '5', isNewEntry: true };
    const state = dispatch(base, { type: 'DECIMAL' });
    expect(state.display).toBe('0.');
  });
});

// ---------------------------------------------------------------------------
// calculatorReducer — OPERATOR
// ---------------------------------------------------------------------------

describe('calculatorReducer — OPERATOR action', () => {
  it('stores display as storedValue', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '8' };
    const state = dispatch(base, { type: 'OPERATOR', payload: '+' });
    expect(state.storedValue).toBe('8');
  });

  it('sets operator on state', () => {
    const state = dispatch(INITIAL_STATE, { type: 'OPERATOR', payload: '*' });
    expect(state.operator).toBe('*');
  });

  it('sets isNewEntry to true', () => {
    const state = dispatch(INITIAL_STATE, { type: 'OPERATOR', payload: '+' });
    expect(state.isNewEntry).toBe(true);
  });

  it('computes the pending IEL operation before storing the new operator (3+5+)', () => {
    const base: CalculatorState = {
      ...INITIAL_STATE,
      display: '5',
      storedValue: '3',
      operator: '+',
      isNewEntry: false,
    };
    const state = dispatch(base, { type: 'OPERATOR', payload: '+' });
    expect(state.display).toBe('8');
    expect(state.storedValue).toBe('8');
  });

  it('replaces operator without computing when isNewEntry is still true', () => {
    const base: CalculatorState = {
      ...INITIAL_STATE,
      display: '3',
      storedValue: '3',
      operator: '+',
      isNewEntry: true,
    };
    const state = dispatch(base, { type: 'OPERATOR', payload: '-' });
    expect(state.operator).toBe('-');
    expect(state.display).toBe('3');
    expect(state.storedValue).toBe('3');
  });
});

// ---------------------------------------------------------------------------
// calculatorReducer — EQUALS
// ---------------------------------------------------------------------------

describe('calculatorReducer — EQUALS action', () => {
  function equalsState(storedValue: string, display: string, operator: CalculatorState['operator']): CalculatorState {
    return { ...INITIAL_STATE, display, storedValue, operator, isNewEntry: false };
  }

  it('computes addition', () => {
    const state = dispatch(equalsState('5', '3', '+'), { type: 'EQUALS' });
    expect(state.display).toBe('8');
  });

  it('computes subtraction', () => {
    const state = dispatch(equalsState('10', '3', '-'), { type: 'EQUALS' });
    expect(state.display).toBe('7');
  });

  it('computes multiplication', () => {
    const state = dispatch(equalsState('6', '4', '*'), { type: 'EQUALS' });
    expect(state.display).toBe('24');
  });

  it('computes division', () => {
    const state = dispatch(equalsState('8', '4', '/'), { type: 'EQUALS' });
    expect(state.display).toBe('2');
  });

  it('produces "Error" for division by zero', () => {
    const state = dispatch(equalsState('5', '0', '/'), { type: 'EQUALS' });
    expect(state.display).toBe('Error');
  });

  it('stores lastOperand equal to the RHS used in the computation', () => {
    const state = dispatch(equalsState('5', '3', '+'), { type: 'EQUALS' });
    expect(state.lastOperand).toBe('3');
  });

  it('repeated equals reapplies the last operation (5+3==→11)', () => {
    const afterFirstEquals = dispatch(equalsState('5', '3', '+'), { type: 'EQUALS' });
    expect(afterFirstEquals.display).toBe('8');
    const afterSecondEquals = dispatch(afterFirstEquals, { type: 'EQUALS' });
    expect(afterSecondEquals.display).toBe('11');
  });

  it('no-ops when operator is null', () => {
    const state = dispatch(INITIAL_STATE, { type: 'EQUALS' });
    expect(state.display).toBe(INITIAL_STATE.display);
    expect(state.operator).toBeNull();
  });

  it('sets isNewEntry to true after computing', () => {
    const state = dispatch(equalsState('5', '3', '+'), { type: 'EQUALS' });
    expect(state.isNewEntry).toBe(true);
  });

  it('sets storedValue to null after computing', () => {
    const state = dispatch(equalsState('5', '3', '+'), { type: 'EQUALS' });
    expect(state.storedValue).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// calculatorReducer — DELETE
// ---------------------------------------------------------------------------

describe('calculatorReducer — DELETE action', () => {
  it('removes the last character from a multi-digit display', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '123' };
    const state = dispatch(base, { type: 'DELETE' });
    expect(state.display).toBe('12');
  });

  it('reverts a single-digit display to "0"', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '5' };
    const state = dispatch(base, { type: 'DELETE' });
    expect(state.display).toBe('0');
  });

  it('no-ops when display is already "0"', () => {
    const state = dispatch(INITIAL_STATE, { type: 'DELETE' });
    expect(state.display).toBe('0');
  });

  it('removes a trailing decimal point', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '5.' };
    const state = dispatch(base, { type: 'DELETE' });
    expect(state.display).toBe('5');
  });

  it('removes the last decimal digit, leaving the decimal point', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '5.3' };
    const state = dispatch(base, { type: 'DELETE' });
    expect(state.display).toBe('5.');
  });

  it('no-ops when isNewEntry is true (nothing was typed in this entry)', () => {
    const base: CalculatorState = { ...INITIAL_STATE, display: '8', isNewEntry: true };
    const state = dispatch(base, { type: 'DELETE' });
    expect(state.display).toBe('8');
    expect(state.isNewEntry).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// calculatorReducer — RESET
// ---------------------------------------------------------------------------

describe('calculatorReducer — RESET action', () => {
  it('returns state equal to INITIAL_STATE from a mid-calculation state', () => {
    const complex: CalculatorState = {
      display: '42',
      storedValue: '7',
      operator: '*',
      isNewEntry: false,
      lastOperand: '3',
    };
    const state = dispatch(complex, { type: 'RESET' });
    expect(state).toEqual(INITIAL_STATE);
  });

  it('is idempotent — RESET from INITIAL_STATE returns INITIAL_STATE', () => {
    const state = dispatch(INITIAL_STATE, { type: 'RESET' });
    expect(state).toEqual(INITIAL_STATE);
  });
});

// ---------------------------------------------------------------------------
// formatDisplay
// ---------------------------------------------------------------------------

describe('formatDisplay', () => {
  it('adds comma separators for thousands', () => {
    expect(formatDisplay('1000')).toBe('1,000');
  });

  it('formats large numbers correctly', () => {
    expect(formatDisplay('399981')).toBe('399,981');
  });

  it('does not add a comma for numbers below 1000', () => {
    expect(formatDisplay('999')).toBe('999');
  });

  it('preserves the decimal portion unchanged', () => {
    expect(formatDisplay('1234.56')).toBe('1,234.56');
  });

  it('handles "0" correctly', () => {
    expect(formatDisplay('0')).toBe('0');
  });

  it('handles a trailing decimal point', () => {
    expect(formatDisplay('1234.')).toBe('1,234.');
  });

  it('passes non-numeric strings through unchanged (e.g. "Error")', () => {
    expect(formatDisplay('Error')).toBe('Error');
  });
});
