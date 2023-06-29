import { expect } from 'chai';
import v1 from './v1.js';

describe('uuid/v1', () => {
  it('should generate a UUIDv1', () => {
    expect(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/.test(v1())).to.equal(true);
  });
});
