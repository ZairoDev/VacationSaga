import {create} from 'zustand';
import {persist} from 'zustand/middleware';
// import {Hotel} from '../../models/hotel';   


interface OwnerDetails {
    name: string;
    email: string;
    phone: string;
    alternateContact?: string;
    aadharCard: string;
    managerName?: string;
    managerContact?: string;
}

interface Location {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude?: number;
    longitude?: number;
}

interface RoomType {
  type: string
  quantity: number
}

interface PropertyDetails {
  propertyName: string
  numberOfRooms: number
  roomTypes: RoomType[]
  starRating: number
  amenities: string[]
  location: Location
  checkInTime: string
  checkOutTime: string
  operatingSince: string 
  description: string
}

interface ListingFormState {
    ownerDetails: OwnerDetails
    propertyDetails: PropertyDetails
    setPropertyDetails: (details: PropertyDetails) => void;
    setOwnerDetails: (details:OwnerDetails)=>void
    resetForm: ()=> void;
}


export const useListingStore = create<ListingFormState>((set) => ({

  ownerDetails: {
    name: '',
    email: '',
    phone: '',  
    alternateContact: '',
    aadharCard: '',
    managerName: '',
    managerContact: '',
},

propertyDetails:{
    propertyName: '',
    numberOfRooms: 0,
    roomTypes: [],
    starRating: 0,
    amenities: [],
    location: {
      address: '',
      city: '',
      state: '',
      country: '',
    },
    checkInTime: '',
    checkOutTime: '',
    operatingSince: '',
    description: '',
},


  setOwnerDetails: (details) =>
    set((state) => ({
      ...state,
      ownerDetails: details,
    })),

      setPropertyDetails: (details) =>
    set((state) => ({
      ...state,
      propertyDetails: details,
    })),

  resetForm: () =>
    set(() => ({
      ownerDetails: {
        name:'',
        email:'',
        phone:'',
        alternateContact:'',
        aadharCard:'',
        managerName:'',
        managerContact:'',
      },
      propertyDetails: {
        propertyName: '',
        numberOfRooms: 0,
        roomTypes: [],
        starRating: 0,
        amenities: [],
        location: {
          address: '',
          city: '',
          state: '',
          country: '',
        },
        checkInTime: '',
        checkOutTime: '',
        operatingSince: '',
        isAvailable: true,
        description: '',
      }
    })),

}))