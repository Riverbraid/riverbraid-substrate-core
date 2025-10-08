import { memory, toResonance, toKnowledge, toTruth, toLight } from './riverbraid-core.mjs';

// --- Mock memory entry
const entry = { id: '001', content: 'Hello, Riverbraid.' };

// 1️⃣ Store in memory
memory.store(entry);

// 2️⃣ Pull from memory
const recalled = memory.recall('001');

// 3️⃣ Flow through the braid
const resonance = toResonance(recalled);
const knowledge = toKnowledge(resonance);
const truth = toTruth(knowledge);
const light = toLight(truth);

console.log('\n✨ Riverbraid Test Run Complete');
console.log('Memory:', recalled);
console.log('Resonance:', resonance);
console.log('Knowledge:', knowledge);
console.log('Truth:', truth);
console.log('Light:', light);
