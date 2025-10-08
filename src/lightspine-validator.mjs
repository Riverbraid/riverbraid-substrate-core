import Ajv from 'ajv';
import { readFileSync } from 'node:fs';

const schema = JSON.parse(readFileSync('schema/riverbraid.lightspine.json', 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

/**
 * Validate a minimal Light-Spine object
 */
export function validateLightSpine(obj) {
  const ok = validate(obj);
  return { ok, errors: ok ? [] : validate.errors };
}
