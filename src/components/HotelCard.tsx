// src/components/HotelCard.tsx
interface Hotel {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
}

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="bg-white text-black rounded-2xl shadow-lg hover:shadow-pink-300/50 transition duration-300 ease-in-out transform hover:-translate-y-1">
      <div
        className="h-48 bg-cover bg-center rounded-t-2xl"
        style={{ backgroundImage: `url('${hotel.image}')` }}
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-pink-600">{hotel.name}</h2>
        <p className="text-sm text-gray-600">{hotel.location}</p>
        <p className="text-lg font-semibold">{hotel.price}</p>
        <button className="mt-2 w-full bg-pink-500 text-white py-2 rounded-xl hover:bg-pink-600 transition">
          Book Now
        </button>
      </div>
    </div>
  );
}

