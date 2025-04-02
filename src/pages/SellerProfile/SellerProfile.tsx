import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';

export default function SellerProfile() {
  const { sellerId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Find the correct seller based on sellerId
  const seller = products.find(p => p.seller.id === sellerId)?.seller;
  const sellerProducts = products.filter(p => p.seller.id === sellerId);

  if (!seller) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Seller not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Image */}
      <div 
        className="h-48 w-full bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80)',
          backgroundColor: '#e6f3ff'
        }}
      />

      {/* Profile Section */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-24">
          {/* Profile Picture */}
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white bg-white">
            <img
              src={seller.profilePicture}
              alt={seller.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="mt-4">
            <h1 className="text-3xl font-bold">{seller.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span>{seller.location}</span>
              <span>•</span>
              <span>0 Followers</span>
              <span>•</span>
              <span>0 Following</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                className="px-6 py-2 bg-[#14213d] text-white rounded-md"
                onClick={() => {}}
              >
                Message
              </button>
              <button
                className="px-6 py-2 border border-[#14213d] text-[#14213d] rounded-md"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button
                className="px-6 py-2 border border-[#14213d] text-[#14213d] rounded-md"
                onClick={() => {}}
              >
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-8 grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="space-y-6">
              <section>
                <h2 className="font-semibold text-lg mb-2">Interests</h2>
                <div className="space-y-1 text-gray-600">
                  <p>Sustainable Farming</p>
                  <p>Organic Agriculture</p>
                  <p>Agricultural Technology</p>
                  <p>Food Security</p>
                  <p>Rural Development</p>
                </div>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">Specialties</h2>
                <div className="space-y-1 text-gray-600">
                  <p>Crop Management</p>
                  <p>Soil Conservation</p>
                  <p>Organic Certification</p>
                  <p>Agricultural Marketing</p>
                  <p>Farm Operations</p>
                </div>
              </section>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <section>
              <h2 className="font-semibold text-lg mb-4">About Me</h2>
              <div className="bg-white rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600">Name:</label>
                    <p>{seller.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-600">Location:</label>
                    <p>{seller.location}</p>
                  </div>
                  <div>
                    <label className="text-gray-600">Experience:</label>
                    <p>15+ years in agriculture</p>
                  </div>
                  <div>
                    <label className="text-gray-600">Contact:</label>
                    <p>{seller.contactNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-gray-600">Bio:</label>
                    <p className="mt-1">
                      Dedicated agricultural professional with a passion for sustainable farming practices. 
                      Specializing in organic produce and modern farming techniques. 
                      Committed to providing high-quality agricultural products while maintaining 
                      environmental responsibility and supporting local farming communities.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="font-semibold text-lg mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sellerProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-red-600 font-bold mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        className="mt-2 w-full text-center py-2 bg-red-600 text-white rounded-md"
                        onClick={() => {}}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}