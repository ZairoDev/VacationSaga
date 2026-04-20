import Travellers from "@/models/traveller";
import User from "@/models/user";

/**
 * Travellers are stored in `users` with role "Traveller".
 * Legacy documents may still exist in the `travellers` collection (same shape for booking flows).
 */
export async function findTravellerById(
  id: string | undefined
): Promise<any | null> {
  if (!id) return null;
  const user = await User.findById(id);
  if (user) {
    return user.role === "Traveller" ? user : null;
  }
  return Travellers.findById(id);
}

export async function findTravellerByEmail(
  email: string | undefined
): Promise<any | null> {
  if (!email) return null;
  const normalized = email.trim();
  const u = await User.findOne({ email: normalized, role: "Traveller" });
  if (u) return u;
  return Travellers.findOne({ email: normalized });
}

/** Push booking id to traveller profile — `users` (role Traveller) or legacy `travellers`. */
export async function pushTravellerUpcomingRequest(
  travellerId: string,
  bookingId: unknown
) {
  const user = await User.findById(travellerId);
  if (user && user.role === "Traveller") {
    return User.findByIdAndUpdate(travellerId, {
      $push: { myUpcommingRequests: bookingId },
    });
  }
  return Travellers.findByIdAndUpdate(travellerId, {
    $push: { myUpcommingRequests: bookingId },
  });
}
