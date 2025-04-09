// SpotList.jsx
import React from 'react';
import { spots } from '../data/spots';

function SpotList({ onSpotClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {spots.map((spot) => (
        <div 
          key={spot.id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSpotClick(spot)}
        >
          <img 
            src={spot.imageUrl} 
            alt={spot.name} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{spot.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{spot.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpotList;