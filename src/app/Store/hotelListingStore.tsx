import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OwnerDetails {
  name: string
  email: string
  phone: string
  alternateContact?: string
  aadharCard: string
  managerName?: string
  managerContact?: string
}

interface Location {
  address: string
  city: string
  state: string
  country: string
  latitude?: number
  longitude?: number
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
  isAvailable?: boolean
}

interface RoomDetail {
  id: string
  roomType: string
  bedType: string
  maxOccupancy: number
  pricePerNight: string
  description: string
  amenities: string[]
  customAmenities: string[]
  photos: File[]
  photoPreviews: string[]
}

interface Policies {
  cancellationPolicy: string
  houseRules: string[]
  allowPets:boolean 
  allowSmoking:boolean
}

interface ListingFormState {
  ownerDetails: OwnerDetails
  propertyDetails: PropertyDetails
  roomDetails: RoomDetail[]
  policies: Policies

  setOwnerDetails: (details: OwnerDetails) => void
  setPropertyDetails: (details: PropertyDetails) => void
  setPolicies:(details:Policies) => void

  addRoomDetail: (room: RoomDetail) => void
  updateRoomDetail: (id: string, room: RoomDetail) => void
  removeRoomDetail: (id: string) => void


  resetForm: () => void
}

export const useListingStore = create<ListingFormState>()(
  persist(
    (set) => ({
      ownerDetails: {
        name: '',
        email: '',
        phone: '',
        alternateContact: '',
        aadharCard: '',
        managerName: '',
        managerContact: '',
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
      },

      roomDetails: [],

      policies: {
        cancellationPolicy: '',
        houseRules: [],
        allowPets: false,
        allowSmoking: false,
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

        setPolicies:(details) =>
          set((state) => ({
            ...state,
            policies:details, 
          }) ),

      addRoomDetail: (room) =>
        set((state) => ({
          roomDetails: [...state.roomDetails, room],
        })),

      updateRoomDetail: (id, updatedRoom) =>
        set((state) => ({
          roomDetails: state.roomDetails.map((room) =>
            room.id === id ? updatedRoom : room
          ),
        })),

      removeRoomDetail: (id) =>
        set((state) => ({
          roomDetails: state.roomDetails.filter((room) => room.id !== id),
        })),

      resetForm: () =>
        set(() => ({
          ownerDetails: {
            name: '',
            email: '',
            phone: '',
            alternateContact: '',
            aadharCard: '',
            managerName: '',
            managerContact: '',
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
          },
          roomDetails: [],

          policies :{
            cancellationPolicy: '',
            houseRules: [],
            allowPets:false,
            allowSmoking:false,
          }
        })),
    }),
    {
      name: 'listing-form-storage',
    }
  )
)
