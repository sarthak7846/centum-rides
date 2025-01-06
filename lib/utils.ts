import { Ride } from "@/types/type";

export const sortRides = (rides: Ride[]): Ride[] => {
  const result = rides.sort((a, b) => {
    const dateA = new Date(`${a.created_at}T${a.ride_time}`);
    const dateB = new Date(`${b.created_at}T${b.ride_time}`);
    return dateB.getTime() - dateA.getTime();
  });

  return result.reverse();
};

export function formatTime(minutes: number): string {
  const formattedMinutes = Math.abs(minutes); // Ensure it's positive

  if (formattedMinutes < 60) {
    return `${Math.round(formattedMinutes)} min`; // Round to nearest minute
  } else {
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = Math.round(formattedMinutes % 60); // Handle remaining minutes

    if (remainingMinutes === 0) {
      return `${hours}h`; // Exclude "0m"
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day < 10 ? "0" + day : day} ${month} ${year}`;
}
