import { CandelaActor } from "./documents/actor.mjs";
import { CandelaItem } from "./documents/item.mjs";

import { CandelaActorSheet } from "./sheets/actor-sheet.mjs";
import { CandelaItemSheet } from "./sheets/item-sheet.mjs";

import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { CANDELAOBSCURA } from "./helpers/config.mjs";

Hooks.once("init", function () {
  game.candelaobscura = {
    CandelaActor,
    CandelaItem,
  };

  CONFIG.CANDELAOBSCURA = CANDELAOBSCURA;

  CONFIG.Combat.initiative = null; /* Maybe don't need this line? */
  CONFIG.Actor.documentClass = CandelaActor;
  CONFIG.Item.documentClass = CandelaItem;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("candelaobscura", CandelaActorSheet, {
    makeDefault: true,
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("candelaobscura", CandelaItemSheet, {
    makeDefault: true,
  });

  return preloadHandlebarsTemplates();
});

Hooks.once("ready", function () {});
