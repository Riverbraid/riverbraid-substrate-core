#!/usr/bin/env node
import { memory, toResonance, toKnowledge, toTruth, toLight } from './riverbraid-core.mjs';
import { loadAll, save } from './storage.mjs';
import { validateLightSpine } from './lightspine-validator.mjs';

const args = process.argv.slice(2);
const cmd = args[0] || 'help';

function out(title, obj) {
  console.log(`\n=== ${title} ===`);
  console.dir(obj, { depth: null, colors: true });
}

switch (cmd) {
  case 'help':
    console.log(`
riverbraid CLI

Usage:
  riverbraid remember "Your message"      Store a memory and emit Light
  riverbraid list                         Show stored memories
  riverbraid validate                     Validate sample Light-Spine schema
  npm run demo                            Run the test pipeline
`);
    break;

  case 'remember': {
    const content = args.slice(1).join(' ') || 'Hello, Riverbraid.';
    const id = String(Date.now());
    const entry = { id, content };

    save(entry);
    memory.store(entry);

    const recalled = memory.recall(id);
    const resonance = toResonance(recalled);
    const knowledge = toKnowledge(resonance);
    const truth = toTruth(knowledge);
    const light = toLight(truth);

    out('Memory', recalled);
    out('Resonance', resonance);
    out('Knowledge', knowledge);
    out('Truth', truth);
    out('Light', light);
    break;
  }

  case 'list': {
    out('All Memories', loadAll());
    break;
  }

  case 'validate': {
    const sample = {
      origin_node: "seed-001",
      resonance_map: [{ input: "M", output: "R", morphism: "m→r" }],
      invariants: { M_to_R: 1, R_to_K: 1, K_to_T: 1, T_to_L: 1 }
    };
    const res = validateLightSpine(sample);
    out('Light-Spine Validate Result', res);
    process.exit(res.ok ? 0 : 1);
  }

  default:
    if (!['help','remember','list','validate'].includes(cmd)) {
      console.error(`Unknown command: ${cmd}`);
      process.exit(1);
    }
}
