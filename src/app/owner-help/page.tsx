export default function OwnerHelp() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-8">
        Help for Property Owners
      </h1>

      <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
        Welcome to the Property Owner Help Center. This section provides guidance for property
        owners who wish to list their properties on our platform and receive booking inquiries
        from travellers. Our platform connects property owners with verified travellers and assists
        in facilitating bookings in a structured and transparent manner.
      </p>

      <div className="space-y-8 text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
        {/* 1. Listing Your Property */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            1. Listing Your Property
          </h2>
          <p className="mb-2">
            Property owners can list their properties on the platform by submitting the required
            details through our listing process.
          </p>
          <p className="mb-2">Information typically required includes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Property address and location</li>
            <li>Property type (villa, apartment, holiday home, etc.)</li>
            <li>Number of rooms and guest capacity</li>
            <li>Amenities and facilities available</li>
            <li>High-quality property photographs</li>
            <li>Availability schedule and pricing</li>
          </ul>
          <p className="mt-2">
            Once submitted, the listing may be reviewed before being published on the platform.
          </p>
        </section>

        {/* 2. Property Verification */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            2. Property Verification
          </h2>
          <p className="mb-2">
            To maintain a reliable platform for travellers, property owners may be asked to provide
            certain verification details such as:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Identification documents</li>
            <li>Ownership proof or property management authorization</li>
            <li>Property photographs and descriptions</li>
          </ul>
          <p className="mt-2">
            Verification helps ensure authenticity and build trust with travellers.
          </p>
        </section>

        {/* 3. How the Booking Process Works */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            3. How the Booking Process Works
          </h2>
          <p className="mb-2">The booking process generally follows these steps:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>A traveller submits an inquiry for your property.</li>
            <li>Property availability is confirmed with the owner.</li>
            <li>
              The traveller pays the required commission or service fee to initiate the booking
              process.
            </li>
            <li>
              Booking confirmation and communication details are shared with both parties.
            </li>
          </ol>
          <p className="mt-2">
            The platform facilitates the connection between the traveller and property owner.
          </p>
        </section>

        {/* 4. Owner Responsibilities */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            4. Owner Responsibilities
          </h2>
          <p className="mb-2">Property owners are responsible for ensuring that:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Property details and photos listed on the platform are accurate.</li>
            <li>The property is available for confirmed bookings.</li>
            <li>Amenities and facilities match the description provided.</li>
            <li>Guests receive proper check-in instructions and property rules.</li>
          </ul>
          <p className="mt-2">
            Failure to maintain accurate information may result in listing suspension.
          </p>
        </section>

        {/* 5. Property Standards */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            5. Property Standards
          </h2>
          <p className="mb-2">
            Owners are encouraged to maintain good property standards to ensure positive guest
            experiences. Recommended practices include:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Maintaining cleanliness and hygiene</li>
            <li>Providing functioning utilities and amenities</li>
            <li>Ensuring safe and comfortable accommodation for guests</li>
            <li>Maintaining clear communication with guests</li>
          </ul>
          <p className="mt-2">
            High-quality properties are more likely to receive repeat bookings and positive
            reviews.
          </p>
        </section>

        {/* 6. Managing Availability */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            6. Managing Availability
          </h2>
          <p className="mb-2">
            Property owners should keep their availability updated to avoid booking conflicts. If
            availability changes, owners should inform the platform promptly so listings can be
            updated.
          </p>
          <p>
            Failure to honor confirmed bookings may impact the property's listing status.
          </p>
        </section>

        {/* 7. Communication with Guests */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            7. Communication with Guests
          </h2>
          <p className="mb-2">
            Once a booking inquiry is confirmed, communication between the guest and property owner
            may be facilitated through the platform. Owners should provide guests with:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check-in instructions</li>
            <li>House rules</li>
            <li>Contact details for arrival assistance</li>
          </ul>
          <p className="mt-2">Clear communication helps ensure smooth guest experiences.</p>
        </section>

        {/* 8. Check-In Guidelines */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            8. Check-In Guidelines
          </h2>
          <p className="mb-2">
            Property owners should ensure that guests receive clear check-in instructions before
            arrival. Important points to confirm with guests include:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check-in and check-out timings</li>
            <li>Identification requirements</li>
            <li>Property access instructions</li>
            <li>House rules and policies</li>
          </ul>
        </section>

        {/* 9. Cancellations and Changes */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            9. Cancellations and Changes
          </h2>
          <p className="mb-2">
            In situations where a property becomes unavailable after confirmation, owners should
            notify the platform immediately. Where possible, alternative arrangements may be
            explored to minimize inconvenience to travellers.
          </p>
        </section>

        {/* 10. Owner Support */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            10. Owner Support
          </h2>
          <p className="mb-2">
            Our support team is available to assist property owners with:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Listing and profile setup</li>
            <li>Managing property details</li>
            <li>Booking coordination</li>
            <li>General platform-related inquiries</li>
          </ul>
          <p className="mt-2">
            Owners can contact support through the communication channels provided on the
            platform.
          </p>
        </section>

        {/* 11. Important Disclaimer */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            11. Important Disclaimer
          </h2>
          <p>
            The platform acts as a facilitator connecting travellers with property owners. While we
            assist with booking coordination, property management, guest experience, and property
            operations remain the responsibility of the property owner unless otherwise agreed.
          </p>
        </section>
      </div>
    </div>
  );
}
