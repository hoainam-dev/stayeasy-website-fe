import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import AddressLink from "../../components/listView/AddressLink";
import PlaceGallery from "../../components/listView/PlaceGallery";




import Booking from "../Booking";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const userId = user.id;
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/v1/stayeasy/booking/traveler/${userId}`)
        .then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8 px-20">
      <h1 className="text-3xl">Địa điểm </h1>
      <AddressLink className="my-2 block">địa điểm cụ thể </AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <Booking booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
