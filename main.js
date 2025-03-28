import { Level } from './src/game/Level.js';
import { State } from './src/game/State.js';
import { DOMDisplay } from './src/display/DOMDisplay.js';
import { simpleLevelPlan } from './src/utils/constants.js';

let simpleLevel = new Level(simpleLevelPlan);
let display = new DOMDisplay(document.body, simpleLevel);
display.syncState(State.start(simpleLevel));