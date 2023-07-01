import { useRouter } from "next/router";
import type { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
// import { initialState, setUserData } from "@/redux/slices/userSlice";
import Link from "next/link";
import StripeVerificationButton from "@/components/verifyIdentity";
import { useEffect, useState } from "react";
import { showLocationPopup } from "@/utils/helpers";
import { axiosClient } from "@/libs/axiosClient";
import { setUserData } from "@/redux/slices/userSlice";

export default function Home() {
  // Retrieve user from redux store
  const user = useSelector((state: RootState) => state.user);

  // initialize loading state
  const [loading, setLoading] = useState(false);
  
  // submitted state
  const [submittedState, setSubmittedState] = useState(0);

  // Initialize the router hook
  const router = useRouter();

  // Initialize the dispatch hook
  const dispatch = useDispatch();

  // Function to handle successful retrieval of user's location
  const handleLocationSuccess = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    try {
      const resp = await axiosClient.put(`/users/${user.id}`, {
        lat: latitude,
        long: longitude
      });
      dispatch(setUserData(resp.data.data));
    } catch (err) {
      console.error(err);
    }
  }

  // Function to handle error when retrieving user's location
  const handleLocationError = (error: GeolocationPositionError) => {
    console.error("Error getting location:", error);
    // Handle the error as needed
  }

  useEffect(() => {
    if (user?.lat !== 0 && user?.long !== 0) {
      showLocationPopup(handleLocationSuccess, handleLocationError);
    }
  }, [user]);

  useEffect(() => {
    if (submittedState === 200) {
      router.push('/home');
    };
  }, [submittedState]);
  
  return (
    <div className="bg-white m-0 p-0 flex flex-col items-center justify-center h-[100vh]">
      <h3 className="font-bold">Verify Identity</h3>
      <div className="flex flex-column mt-3">
        <StripeVerificationButton 
          user={user} 
          loading={loading}
          setLoading={setLoading}
          setSubmitted={setSubmittedState}
        />
      </div>
      <Link
        className="mt-3 underline text-blue-600 text-[13px]"
        href="/home"
        passHref
      >
        Skip verification
      </Link>
    </div>
  );
}
