import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapboxgl from "mapbox-gl";
import settings from "./settings.json";
import custom from "./custom-style.json";

let map;

async function init() {
    const sites = await import ("../data/sites.json");
    const neighborhoods = await import ("../data/output.json");
    const transit_north  = await import ("../data/transit_north.json");
    const style = map.getStyle();

    style.sources = {
        ...style.sources,
        ...custom.sources
    };
    style.layers.push(...custom.layers);
    map.setStyle(style);

    map.getSource("sites").setData(sites);
    map.getSource("neighborhoods").setData(neighborhoods);
    map.getSource("transit_north").setData(transit_north);
}


mapboxgl.accessToken = settings.accessToken;
map = new mapboxgl.Map(settings);
map.on("load", init);
