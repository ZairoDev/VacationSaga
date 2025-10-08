"use client";
import { useEffect, useState } from 'react';
import { AlertCircle, Home, ExternalLink, MapPin, Users, Bed, Bath, Maximize2, Compass, Loader2 } from 'lucide-react';

interface PropertyResult {
  _id: string;
  VSID: string;
}

interface ApiResponse {
  success: boolean;
  data?: PropertyResult[];
  error?: string;
}

interface Property {
  VSID: string;
  propertyType: string;
  city: string;
  country: string;
  guests: number[];
  bedrooms: number[];
  bathroom: number[];
  portionSize: number[];
  orientation?: string;
  rentalType: string;
  area?: string;
  subarea?: string;
  neighbourhood?: string;
  postalCode?: string;
  floor?: string;
  isTopFloor?: boolean;
  propertyStyle?: string;
  propertyCoverFileUrl: string;
  propertyPictureUrls: string[];
  portionCoverFileUrls: string[];
  portionPictureUrls: string[][];
}

const RedirectPage = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [result, setResult] = useState<PropertyResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allImages, setAllImages] = useState<string[]>([]);
  const indexId = 0;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/particular/${indexId}`);
        const data = await response.json();

        if (data) {
          setProperty(data);

          // Collect all images for bento grid
          let arr: string[] = [];
          if (data.propertyCoverFileUrl) arr.push(data.propertyCoverFileUrl);
          if (data.propertyPictureUrls) arr = [...arr, ...data.propertyPictureUrls];
          if (data.portionCoverFileUrls) arr = [...arr, ...data.portionCoverFileUrls];
          if (data.portionPictureUrls) {
            for (let i = 0; i < data.portionPictureUrls.length; i++) {
              if (data.portionPictureUrls[i]) {
                arr = [...arr, ...data.portionPictureUrls[i]];
              }
            }
          }
          arr = arr.filter((item) => item !== '');
          setAllImages(arr);

          // Fetch new VSID
          if (data.VSID) {
            await fetchNewVSID(data.VSID);
          }
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property information');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, []);

  const fetchNewVSID = async (vsid: string) => {
    try {
      const res = await fetch('/api/getPropertyNewVSID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingVSID: vsid }),
      });

      const data: ApiResponse = await res.json();

      if (data.success && data.data) {
        setResult(data.data);
      }
    } catch (err) {
      console.error('Error fetching new VSID:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-400 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
     

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Oops Message */}
        <div className="mb-10 text-center animate-[slideDown_0.5s_ease-out]">
          <div className="inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <AlertCircle className="h-10 w-10 text-orange-300" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-3">
              Oops!
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Looks like you&apos;ve landed on our old page&apos;s link
            </p>
          </div>

          {/* New VSID and Redirect Link at Top */}
          {result && result[0] && (
            <div className="max-w-2xl mx-auto space-y-4 mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 transform transition-all hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-600">Updated Property</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">
                  New VS ID: <span className="text-orange-400">{result[0].VSID}</span>
                </p>
              </div>

              <a
                href={`/listing-stay-detail/${result[0]._id}`}
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-300 to-orange-400 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Redirect To New Page
                  <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </span>
                {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div> */}
              </a>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-600 font-medium">
              Property Details
            </span>
          </div>
        </div>

        {/* Property Card */}
        {property && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Bento Grid Gallery */}
             <div className="p-4">
              <div className="grid grid-cols-4 gap-2">
                {allImages.slice(0, 5).map((image, index) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                      index === 0
                        ? 'col-span-4 sm:col-span-2 row-span-2 h-96'
                        : 'col-span-2 sm:col-span-1 h-44'
                    }`}
                  >
                    <img
                      src={image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'}
                      alt={`Property ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

                    {index === 0 && (
                      <div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <span className="px-4 py-1.5 bg-white/95 backdrop-blur-sm text-slate-800 rounded-full text-sm font-semibold shadow-lg">
                            {property.propertyType}
                          </span>
                          <span className="px-4 py-1.5 bg-orange-400/95 backdrop-blur-sm text-white rounded-full text-sm font-semibold shadow-lg">
                            Old VSID: {property.VSID}
                          </span>
                          {property.rentalType === 'Long Term' && property.propertyStyle && (
                            <span className="px-4 py-1.5 bg-slate-800/95 backdrop-blur-sm text-white rounded-full text-sm font-semibold shadow-lg">
                              {property.propertyStyle}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="p-8">
              {/* Title & Location */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  VS ID - {property.VSID}
                </h2>
                <div className="flex items-center text-slate-600 space-x-2">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span className="text-lg">
                    {property.city}, {property.country}
                  </span>
                </div>
                {property.rentalType === 'Long Term' && property.area && (
                  <p className="text-slate-600 mt-2 ml-7">
                    {property.area} of {property.subarea}, {property.neighbourhood}, {property.postalCode}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200 my-6"></div>

              {/* Property Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl transition-all hover:bg-slate-100 hover:shadow-md">
                  <Users className="w-7 h-7 text-orange-400 mb-2" />
                  <span className="text-2xl font-bold text-slate-900">{property.guests[indexId] || 3}</span>
                  <span className="text-sm text-slate-600 mt-1">Guests</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl transition-all hover:bg-slate-100 hover:shadow-md">
                  <Bed className="w-7 h-7 text-orange-400 mb-2" />
                  <span className="text-2xl font-bold text-slate-900">{property.bedrooms[indexId]}</span>
                  <span className="text-sm text-slate-600 mt-1">Bedrooms</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl transition-all hover:bg-slate-100 hover:shadow-md">
                  <Bath className="w-7 h-7 text-orange-400 mb-2" />
                  <span className="text-2xl font-bold text-slate-900">{property.bathroom[indexId]}</span>
                  <span className="text-sm text-slate-600 mt-1">Bathrooms</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl transition-all hover:bg-slate-100 hover:shadow-md">
                  <Maximize2 className="w-7 h-7 text-orange-400 mb-2" />
                  <span className="text-2xl font-bold text-slate-900">{property.portionSize[indexId]}</span>
                  <span className="text-sm text-slate-600 mt-1">sq ft</span>
                </div>
              </div>

              {property.rentalType === 'Long Term' && property.orientation && (
                <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl">
                  <Compass className="w-6 h-6 text-orange-400 mr-3" />
                  <span className="text-lg font-semibold text-slate-800">
                    Orientation: {property.orientation}
                  </span>
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-800 text-center">{error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-sm">
            Thank you for your patience and understanding. If you continue to experience issues, please contact our support team.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-white/80 backdrop-blur-sm border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-600 text-sm">
            © 2025 VacationSaga. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RedirectPage;
