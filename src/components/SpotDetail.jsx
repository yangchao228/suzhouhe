// SpotDetail.jsx
import React from 'react';

function SpotDetail({ spot, onClose }) {
  if (!spot) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto">
        <div className="p-4">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
          <img 
            src={spot.image} 
            alt={spot.name} 
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-bold mt-4 mb-2">{spot.name}</h2>
          <div className="text-gray-600 mb-4">
            <p className="mb-2">{spot.description}</p>
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">交通指南</h3>
              <p>{spot.transportation}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">开放时间</h3>
              <p>{spot.openingHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotDetail;