import { useRouter } from "next/router";
import type { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { initialState, setUserData } from "@/redux/slices/userSlice";
import Navbar from "@/components/navbar";
import styles from "./style.module.scss";
import { useEffect } from "react";

export default function Home() {
  // Retrieve user from redux store
  const user = useSelector((state: RootState) => state.user);

  // Initialize the router hook
  const router = useRouter();
  // Initialize the dispatch hook
  const dispatch = useDispatch();

  // Logout user by setting data to default state and proceed to landing page
  const logout = () => {
    dispatch(setUserData(initialState));
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll event here
      const navbar = document.querySelector(".navbar-wrapper");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
          navbar?.classList.add("sticky");
        } else {
          navbar?.classList.remove("sticky");
        }
      });
    };

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.homeBanner}>
        <h1 className="font-bold text-[50px] text-center">
          Get a gig near you with ease.
        </h1>
        <p className="mt-8">
          Find local gigs matching your skills and interests. Showcase talents,
          grow your career. No long commutes - explore gigs nearby. Connect with
          employers or clients, unlock new possibilities, all while staying
          close to home. Embrace convenience today!
        </p>
        <div className="flex justify-center mt-8">
          <div className={styles.jobSearchInputWrapper}>
            <input
              type="text"
              title="Job Title"
              placeholder="Job Title"
              className="border mr-3"
            />
            <select title="Pick Location" className="mr-3">
              <option>Location</option>
            </select>
            <button className="p-2">Find Now</button>
          </div>
        </div>
      </div>
      <div className="bg-white m-0 p-0 flex flex-col items-center justify-center h-[100vh]">
        <h3 className="font-bold">Welcome to Gigs Platform {user?.name}!</h3>
        <div className="flex flex-row mt-3">
          <button
            type="button"
            onClick={logout}
            className="p-1 text-[#fff] bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
