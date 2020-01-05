// Unit-tests for Palette class.

import {Palette} from './palette';
import { expect } from 'chai';
import 'mocha';

let p = new Palette(100);

describe('Palette.getColour()', () => {

  it('0.0 should return [0,0,0]', () => {
    const result = p.getColour(0);
    expect(result).to.equal('rgb(0,0,0)');
  });

  it('1.0 should return [255,255,255]', () => {
    const result = p.getColour(1);
    expect(result).to.equal('rgb(255,255,255)');
  });

});
