export default function Footer() {
  return (
    <footer className="bg-black text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Vegas<span className="text-pink-400">Ailure</span></h3>
          <p className="text-sm text-gray-400">Your AI-powered Las Vegas travel assistant. Find the perfect hotels, shows, and experiences for your Vegas adventure.</p>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/hotels" className="hover:text-pink-400 transition">Hotels</a></li>
            <li><a href="/flights" className="hover:text-pink-400 transition">Flights</a></li>
            <li><a href="/entertainment" className="hover:text-pink-400 transition">Shows & Events</a></li>
            <li><a href="/clubs" className="hover:text-pink-400 transition">Nightlife</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-pink-400 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-pink-400 transition">Contact</a></li>
            <li><a href="/careers" className="hover:text-pink-400 transition">Careers</a></li>
            <li><a href="/press" className="hover:text-pink-400 transition">Press</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/terms" className="hover:text-pink-400 transition">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-pink-400 transition">Privacy Policy</a></li>
            <li><a href="/cookies" className="hover:text-pink-400 transition">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} VegasAilure. All rights reserved.</p>
      </div>
    </footer>
  );
}
