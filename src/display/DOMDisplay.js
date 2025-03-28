import { scale } from "../utils/constants.js";
import { elt } from "../utils/helpers.js";
import { drawActors } from "./drawActors.js";

 export class DOMDisplay {
    constructor(parent, level) {
        this.dom = elt("div", {class: "game"}, drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    clear() {
        this.dom.remove();
    }

    syncState(state) {
        if (this.actorLayer) this.actorLayer.remove();
        this.actorLayer = drawActors(state.actors);
        this.dom.appendChild(this.actorLayer);
        this.dom.className = `game ${state.status}`;
        this.scrollPlayerIntoView(state);
    }

    scrollPlayerIntoView(state) {
        let width = this.dom.clientWidth;
        let height = this.dom.clientHeight;
        let margin = width / 3;

        // The viewport
        let left = this.dom.scrollLeft, right = left + width;
        let top = this.dom.scrollTop, bottom = top + height;

        let player = state.player;
        let center = player.pos.plus(player.size.times(0.5)).times(scale);

        if (center.x < left + margin) {
            this.dom.scrollLeft = center.x - margin;
        } else if (center.x > right - margin) {
            this.dom.scrollLeft = center.x + margin - width;
        }
        if (center.y < top + margin) {
            this.dom.scrollTop = center.y - margin;
        } else if (center.y > bottom - margin) {
            this.dom.scrollTop = center.y + margin - height;
        }
    }
}

function drawGrid(level) {
    return elt("table", {
        class: "background",
        style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row =>
        elt("tr", {style: `height: ${scale}px`},
            ...row.map(type => elt("td", {class: type})))
    ));
}
