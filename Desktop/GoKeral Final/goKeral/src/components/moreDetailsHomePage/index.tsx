
import { MapPin, Camera, Sunrise, Coffee, Palmtree } from 'lucide-react';

function MoreDetails() {
  return (
    <>
      <div className="mt-1 space-y-12">
        {/* Popular Destinations Section */}
        <div>
          <h2
            className="text-2xl md:text-3xl text-white font-bold mb-6"
            style={{ fontFamily: "Playfair Display" }}
          >
            Popular Destinations
          </h2>
          
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {[
                {
                  name: "Munnar",
                  description: "Misty hills and tea plantations",
                  icon: <Sunrise className="w-6 h-6" />
                },
                {
                  name: "Alleppey",
                  description: "Serene backwaters and houseboats",
                  icon: <Palmtree className="w-6 h-6" />
                },
                {
                  name: "Wayanad",
                  description: "Wildlife and adventure trails",
                  icon: <MapPin className="w-6 h-6" />
                }
              ].map((destination, index) => (
                <div
                  key={index}
                  className="min-w-[280px] snap-start bg-black/30 backdrop-blur-sm border border-golden/20 p-6 group hover:border-golden transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-golden p-2 bg-black/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {destination.icon}
                    </span>
                    <h3
                      className="text-white text-xl font-semibold"
                      style={{ fontFamily: "Playfair Display" }}
                    >
                      {destination.name}
                    </h3>
                  </div>
                  <p className="text-zinc-300 text-sm mt-4" style={{ fontFamily: "Montserrat" }}>
                    {destination.description}
                  </p>
                  <button className="mt-4 text-golden text-sm uppercase tracking-wider flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    Explore More
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tourism Features Section */}
        <div>
          <h2
            className="text-2xl md:text-3xl text-white font-bold mb-6"
            style={{ fontFamily: "Playfair Display" }}
          >
            Tourism Features
          </h2>
          
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {[
                {
                  title: "Iconic Destinations",
                  description: "From serene backwaters to misty hill stations, explore Kerala's most breathtaking locations",
                  icon: <MapPin className="w-8 h-8" />
                },
                {
                  title: "Photo Spots",
                  description: "Discover Instagram-worthy locations and capture memories that last forever",
                  icon: <Camera className="w-8 h-8" />
                },
                {
                  title: "Local Culture",
                  description: "Immerse yourself in Kerala's rich heritage, arts, and culinary traditions",
                  icon: <Coffee className="w-8 h-8" />
                },
                {
                  title: "Eco Tourism",
                  description: "Experience sustainable travel through Kerala's pristine natural wonders",
                  icon: <Palmtree className="w-8 h-8" />
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="min-w-[280px] snap-start bg-black/30 backdrop-blur-sm border border-golden/20 p-6 group hover:border-golden transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                >
                  <span className="inline-block text-golden p-2 bg-black/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                  <h3 
                    className="text-golden text-lg font-semibold mb-2"
                    style={{fontFamily: "Playfair Display"}}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-zinc-300 text-sm"
                    style={{fontFamily: "Montserrat"}}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoreDetails;