import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { 
  ChatBubbleLeftIcon, 
  UserPlusIcon, 
  UserMinusIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import type { Service } from '../../types/interfaces/Services';
import type { Expert } from '../../types/interfaces/Expert';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import BookingModal from './BookingModal';
import { experts, mockReviews, services } from '../../data/experts';

// Update the Review interface to match the ServiceReview structure
interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  rating: number;
  date: string;
  comment: string;
  serviceId: string;
  isVerified: boolean;
}

export default function ExpertProfile() {
  const { expertId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [expert, setExpert] = useState<Expert | null>(null);
  const [expertServices, setExpertServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpertData = async () => {
      try {
        setLoading(true);
        const expertData = experts.find(e => e.id === expertId);
        const servicesData = services.filter(s => s.provider.id === expertId);
        const reviewsData = mockReviews.filter(r => 
          servicesData.some(s => s.id === r.serviceId)
        );

        if (!expertData) {
          navigate('/not-found');
          return;
        }

        setExpert(expertData);
        setExpertServices(servicesData);
        setReviews(reviewsData);
        setIsFollowing(expertData.isFollowing);
      } catch (error) {
        toast.error('Failed to load expert profile');
      } finally {
        setLoading(false);
      }
    };

    if (expertId) {
      fetchExpertData();
    }
  }, [expertId, navigate]);

  if (loading || !expert) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-[#468847] border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading expert profile...</p>
      </div>
    );
  }

  const handleFollow = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to follow experts');
      navigate('/auth/login');
      return;
    }

    try {
      // API call to follow/unfollow
      setIsFollowing(!isFollowing);
      toast.success(isFollowing ? 'Unfollowed expert' : 'Following expert');
    } catch (error) {
      toast.error('Failed to update follow status');
    }
  };

  const handleMessage = () => {
    if (!isAuthenticated) {
      toast.error('Please login to message experts');
      navigate('/auth/login');
      return;
    }
    // Implement chat functionality
    navigate(`/messages/${expertId}`);
  };

  const handleBooking = (service: Service) => {
    if (!isAuthenticated) {
      toast.error('Please login to book services');
      navigate('/auth/login');
      return;
    }
    setSelectedService(service);
    setShowBookingModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Expert Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48 bg-[#468847]">
          <div className="absolute -bottom-16 left-8">
            <img
              src={expert.image}
              alt={expert.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>
        
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{expert.name}</h1>
              <p className="text-lg text-gray-600">{expert.specialty}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleMessage}
                className="flex items-center gap-2 px-4 py-2 border border-[#468847] text-[#468847] rounded-md hover:bg-[#468847] hover:text-white transition-colors"
              >
                <ChatBubbleLeftIcon className="h-5 w-5" />
                Message
              </button>
              <button
                onClick={handleFollow}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isFollowing
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-[#468847] text-white hover:bg-[#3a7139]'
                }`}
              >
                {isFollowing ? (
                  <><UserMinusIcon className="h-5 w-5" /> Unfollow</>
                ) : (
                  <><UserPlusIcon className="h-5 w-5" /> Follow</>
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <span className="block text-2xl font-bold">{expert.rating}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(expert.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold">{expert.followers}</span>
              <span className="text-gray-600">Followers</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold">{expert.following}</span>
              <span className="text-gray-600">Following</span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-gray-700">{expert.bio}</p>
            
            <div className="flex items-center gap-2 text-gray-600">
              <MapPinIcon className="h-5 w-5" />
              {expert.location}
            </div>
            
            {expert.availability && (
              <div className="flex items-center gap-2 text-gray-600">
                <ClockIcon className="h-5 w-5" />
                Available: {expert.availability.days.join(', ')} | {expert.availability.hours}
              </div>
            )}
            
            <div className="flex items-center gap-2 text-gray-600">
              <PhoneIcon className="h-5 w-5" />
              {expert.contactNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertServices.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(service.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({service.reviewCount})</span>
                  </div>
                  <span className="text-[#468847] font-semibold">{service.price}</span>
                </div>
                <button
                  onClick={() => handleBooking(service)}
                  className="w-full bg-[#468847] text-white py-2 rounded-md hover:bg-[#3a7139] transition-colors"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-gray-900">{expert.rating}</span>
            <div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(expert.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">Based on {reviews.length} reviews</span>
            </div>
          </div>
        </div>
      
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <img
                  src={review.user.image}
                  alt={review.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                    {review.isVerified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500 block mt-2">{review.date}</span>
              <p className="mt-4 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {showBookingModal && selectedService && (
        <BookingModal
          service={selectedService}
          expert={expert}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}