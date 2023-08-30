import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import {Icon, Style} from 'ol/style.js';
import { Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

    
export function newOLmap(lonlatData,targetmap){

    let zoomLevel = 1;


    if(lonlatData){
        lonlatData = lonlatData.split(',');
        zoomLevel = 18;
    } else {
        lonlatData = [0,0];
    }
    
    const iconFeature = new Feature({
        geometry: new Point(fromLonLat(lonlatData)),
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          width: 30,
          crossOrigin: 'anonymous',
          src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png'
        }),
    });
   
    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
        features: [iconFeature],
      });
      
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      
      const rasterLayer = new TileLayer({
        source: new OSM(),
      });

    
    const map = new Map({
        target: targetmap,
        layers: [rasterLayer, vectorLayer],
        view: new View({
            constrainResolution: true,
            center: fromLonLat(lonlatData),
            zoom: zoomLevel,
        }),
    });

}



