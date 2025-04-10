import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const Map = ({ onSpotClick }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. 首先加载脚本
  useEffect(() => {
    const loadScripts = async () => {
      try {
        // 创建安全密钥配置
        window._AMapSecurityConfig = {
          securityJsCode: 'ba96992507f730d0c4ee7a313c2fc66c'
        };

        await loadMapScript();
        await loadUIScript();
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading scripts:', err);
        setError(err.message);
      }
    };

    loadScripts();
  }, []);

  // 2. 脚本加载完成后，初始化地图
  useEffect(() => {
    if (!isLoading && mapRef.current && !map && !error) {
      const initializeMap = async () => {
        try {
          await initMap();
        } catch (err) {
          console.error('Error initializing map:', err);
          setError(err.message);
        }
      };

      initializeMap();
    }
  }, [isLoading, mapRef.current]);

  const loadMapScript = () => {
    return new Promise((resolve, reject) => {
      if (window.AMap) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://webapi.amap.com/maps?v=2.0&key=9fca23a2f75cc59b2d75ab6e99e54326';
      script.async = true;
      script.onload = () => {
        setTimeout(resolve, 100);
      };
      script.onerror = () => reject(new Error('Failed to load AMap script'));
      document.head.appendChild(script);
    });
  };

  const loadUIScript = () => {
    return new Promise((resolve, reject) => {
      if (window.AMapUI) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://webapi.amap.com/ui/1.1/main.js';
      script.async = true;
      script.onload = () => {
        // 给予一点加载时间
        setTimeout(resolve, 100);
      };
      script.onerror = () => reject(new Error('Failed to load AMapUI script'));
      document.head.appendChild(script);
    });
  };

  const initMap = async () => {
    return new Promise((resolve, reject) => {
      try {
        if (!window.AMap) {
          reject(new Error('AMap is not loaded'));
          return;
        }

        if (!mapRef.current) {
          reject(new Error('Map container div not exist'));
          return;
        }

        // Initialize map centered on Suzhou River (Shanghai)
        const mapInstance = new window.AMap.Map(mapRef.current, {
          zoom: 13,
          center: [121.4737, 31.2304],
          viewMode: '3D',
          resizeEnable: true
        });

        mapInstance.on('complete', () => {
          setMap(mapInstance);
          resolve(mapInstance);
        });
      } catch (err) {
        reject(err);
      }
    });
  };

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