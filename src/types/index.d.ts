/* eslint-disable @typescript-eslint/no-empty-object-type */
enum BookingType {
  Unclaimed = 'Unclaimed',
  FirstContact = 'First Contact',
  PreparingWorkOffer = 'Preparing Work Offer',
  SentToTherapist = 'Sent to Therapist'
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  type: BookingType;
}

// inherit from Booking except the type and id
interface BookingFormData extends Omit<Booking, 'id'> {}
