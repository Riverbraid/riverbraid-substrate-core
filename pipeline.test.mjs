import test from 'node:test';
import assert from 'node:assert/strict';
import { memory, toResonance, toKnowledge, toTruth, toLight } from '../src/riverbraid-core.mjs';

test('M→R→K→T→L emits Light for valid entry', () => {
  const entry = { id: 't-001', content: 'spec' };
  memory.store(entry);
  const recalled = memory.recall('t-001');

  const R = toResonance(recalled);
  const K = toKnowledge(R);
  const T = toTruth(K);
  const L = toLight(T);

  assert.ok(R.coherence);
  assert.ok(K.insight);
  assert.equal(T.sourceConfirmed, true);
  assert.ok(L);
});
