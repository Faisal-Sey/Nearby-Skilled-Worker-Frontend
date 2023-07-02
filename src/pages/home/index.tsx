import { useRouter } from "next/router";
import { useEffect } from "react";
import type { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { initialState, setUserData } from "@/redux/slices/userSlice";
import Navbar from "@/components/navbar";
import styles from "./style.module.scss";
import CategoryCard from "./components/categoryCard/categoryCard";
import GigCard from "./components/gigCard";
import ReviewCard from "./components/reviewCard";
import Footer from "@/components/footer";
// import 

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

  const categories = [
    { id: "carpentry", title: "Carpentry", gigs: 18 },
    { id: "electrician", title: "Electrician", gigs: 16 },
    { id: "mason-works", title: "Mason works", gigs: 10 },
    { id: "teaching", title: "Teaching", gigs: 9 },
    { id: "plumbing", title: "Plumbing", gigs: 2 },
    { id: "welding", title: "Welding", gigs: 1 },
  ];

  const gigs = [
    { id: "carpentry", title: "Carpentry", gigs: 18 },
    { id: "electrician", title: "Electrician", gigs: 16 },
    { id: "mason-works", title: "Mason works", gigs: 10 },
  ];

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
        <p className="mt-8 flex justify-center">
          <span className="w-[50%] text-center">
            Find local gigs matching your skills and interests. Showcase
            talents, grow your career. No long commutes - explore gigs nearby.
            Connect with employers or clients, unlock new possibilities, all
            while staying close to home. Embrace convenience today!
          </span>
        </p>
        <div className="flex justify-center mt-8">
          <div className={styles.jobSearchInputWrapper}>
            <input
              type="text"
              title="Job Title"
              placeholder="Job Title"
              className="border mr-3 p-3 rounded-md"
            />
            <select title="Pick Location" className="mr-3">
              <option>Location</option>
            </select>
            <button className="p-2">Find Now</button>
          </div>
        </div>
      </div>
      <div className={styles.topCategories}>
        <h1 className="font-bold uppercase text-[20px]">Top Categories</h1>
        <p>Find gigs across different categories.</p>
        <div className="category-cards mt-8 flex flex-wrap">
          {categories.map((elt) => (
            <CategoryCard key={elt.id} title={elt.title} gigs={elt.gigs} />
          ))}
          <CategoryCard
            title="18+"
            subtitle={
              <button type="button" className="border rounded-sm text-[#000] p-2">
                See More
              </button>
            }
          />
        </div>
      </div>
      <div className={styles.recentGigs}>
        <h1 className="font-bold uppercase text-[20px]">Recent Gigs</h1>
        <div className="flex flex-wrap items-center justify-between">
          <p className="mb-3">5 gigs posted recently</p>      
          <div className={styles.filterButtons}>
            <button type="button">Marketing</button>
            <button type="button">Carpentry</button>
            <button type="button">Mason Works</button>
            <button type="button">Teaching</button>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap">
          {gigs.map((elt) => <GigCard key={elt.id} />)}
        </div>
      </div>
      <div className={styles.gigsPlatformReviews}>
        <div>
          <h1 className="font-bold uppercase text-[20px]">Reviews</h1>
          <p>What people say about gigs platform</p>
        </div>
        <div className={styles.reviewCardsWrapper}>
          {categories.map((elt) => <ReviewCard key={elt.id} />)}
        </div>
      </div>
      <Footer />
    </>
  );
}
