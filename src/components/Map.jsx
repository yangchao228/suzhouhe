import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { spots } from '../data/spots';

const Map = ({ onSpotClick }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load AMap
    const loadAMap = async () => {
      try {
        // Ensure map container exists before proceeding
        if (!mapRef.current) {
          throw new Error('Map container not ready');
        }

        // Create security JsCode
        window._AMapSecurityConfig = {
          securityJsCode: '2aeef1fbf6bc523430d605f9f83c0810'
        };

        // Load main AMap script
        await new Promise((resolve, reject) => {
          if (window.AMap) {
            resolve();
            return;
          }
          const AMapScript = document.createElement('script');
          AMapScript.src = 'https://webapi.amap.com/maps?v=2.0&key=b6d99d25c9ee96f14284ac00736b544b';
          AMapScript.async = true;
          AMapScript.onerror = () => {
            reject(new Error('Failed to load AMap script'));
          };
          AMapScript.onload = () => {
            // Give a small delay to ensure AMap is fully initialized
            setTimeout(resolve, 100);
          };
          document.head.appendChild(AMapScript);
        });

        // Load AMap UI library
        await new Promise((resolve, reject) => {
          if (window.AMapUI) {
            resolve();
            return;
          }
          const AMapUIScript = document.createElement('script');
          AMapUIScript.src = 'https://webapi.amap.com/ui/1.1/main.js';
          AMapUIScript.async = true;
          AMapUIScript.onerror = () => {
            reject(new Error('Failed to load AMapUI script'));
          };
          AMapUIScript.onload = () => {
            // Give a small delay to ensure AMapUI is fully initialized
            setTimeout(resolve, 100);
          };
          document.head.appendChild(AMapUIScript);
        });

        await initMap();
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading map:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    const initMap = async () => {
      if (!window.AMap) {
        throw new Error('AMap is not loaded');
      }

      // Double check map container exists
      if (!mapRef.current) {
        throw new Error('Map container div not exist');
      }

      try {
        // Initialize map centered on Suzhou River (Shanghai)
        const mapInstance = new window.AMap.Map(mapRef.current, {
          zoom: 13,
          center: [121.4737, 31.2304], // Suzhou River coordinates
          viewMode: '3D',
          resizeEnable: true
        });

        // Wait for map to be ready
        await new Promise((resolve) => {
          mapInstance.on('complete', resolve);
          // Set a timeout in case the complete event doesn't fire
          setTimeout(resolve, 2000);
        });

        setMap(mapInstance);

        // Create markers for each spot
        const markerInstances = spots.map(spot => {
          try {
            const marker = new window.AMap.Marker({
              position: new window.AMap.LngLat(spot.coordinates[0], spot.coordinates[1]),
              title: spot.name,
              animation: 'AMAP_ANIMATION_DROP'
            });

            // Add click event to marker
            marker.on('click', () => {
              if (infoWindow) {
                infoWindow.close();
              }

              const info = new window.AMap.InfoWindow({
                content: `
                  <div class="info-window">
                    <h3 class="text-lg font-bold">${spot.name}</h3>
                    <p class="mt-2">${spot.description}</p>
                  </div>
                `,
                offset: new window.AMap.Pixel(0, -30)
              });

              info.open(mapInstance, marker.getPosition());
              setInfoWindow(info);
              
              if (onSpotClick) {
                onSpotClick(spot);
              }
            });

            return marker;
          } catch (err) {
            console.error(`Error creating marker for spot ${spot.name}:`, err);
            return null;
          }
        }).filter(Boolean); // Remove any null markers

        // Add markers to map
        mapInstance.add(markerInstances);
        setMarkers(markerInstances);

        // Add map controls
        try {
          mapInstance.addControl(new window.AMap.Scale());
          mapInstance.addControl(new window.AMap.ToolBar({
            position: 'LT'
          }));
        } catch (err) {
          console.error('Error adding map controls:', err);
        }
      } catch (err) {
        throw new Error(`Failed to initialize map: ${err.message}`);
      }
    };

    loadAMap();

    // Cleanup
    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] rounded-lg shadow-lg flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading map...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[600px] rounded-lg shadow-lg flex items-center justify-center bg-red-50">
        <div className="text-xl text-red-600">Error loading map: {error}</div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[600px] rounded-lg shadow-lg"
      style={{ border: '2px solid #e5e7eb' }}
    ></div>
  );
};

Map.propTypes = {
  onSpotClick: PropTypes.func
};

export default Map;