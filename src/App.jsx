// App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import SpotList from './components/SpotList';
import SpotDetail from './components/SpotDetail';
import Map from './components/Map';

function App() {
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
  };

  const handleCloseDetail = () => {
    setSelectedSpot(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-16">
        {/* Spots Section */}
        <section id="spots" className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">景点列表</h2>
          <SpotList onSpotClick={handleSpotClick} />
        </section>

        {/* Map Section */}
        <section id="map" className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">地图导览</h2>
          <Map onSpotClick={handleSpotClick} />
        </section>

        {/* Spot Detail Modal */}
        {selectedSpot && (
          <SpotDetail 
            spot={selectedSpot}
            onClose={handleCloseDetail}
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 苏州河旅游 | 本网站仅供演示使用</p>
        </div>
      </footer>
    </div>
  );
}

export default App;