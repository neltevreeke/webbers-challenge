import { Review } from "../modules/review/models/review";

export const maskEmail = (email: string) => {
  const [user, domain] = email.split("@");
  const maskedUser = user.slice(0, 2) + "•".repeat(user.length - 2);
  return `${maskedUser}@${domain}`;
}