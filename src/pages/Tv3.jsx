import React from "react";
import { useEffect, useState } from "react";
import "./Tv3.css";
import AdImage from "../components/AdImage";
import woodImage from "../assets/wood.jpg";

const Tv3 = () => {
  const [foodApiData, setfoodApiData] = useState([]);
  const [adData, setAdData] = useState({});
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const apiUrl = "https://ologybrewing.com/wp-json/wp/v2/food_ology";
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();

        // Store the data locally using localStorage
        localStorage.setItem("foodApiData", JSON.stringify(jsonData));
        setfoodApiData(jsonData);
      } catch (error) {
        // Handle error (e.g., log, show user-friendly message)
        console.error("Error fetching data:", error.message);

        // Attempt to use locally stored data on error
        const locallyStoredData = localStorage.getItem("foodApiData");

        if (locallyStoredData) {
          setData(JSON.parse(locallyStoredData));
        }
      }
    };

    // Fetch data when the component mounts
    fetchData();

    const intervalId = setInterval(fetchData, 60 * 1000); // Update every minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    // Filter items where Featured is "on"
    const featuredAds = foodApiData.filter(
      (item) => item.locations?.Northside?.Featured?.includes("on") ?? false
    );

    // Transform the filtered items into adData array
    const transformedAdData = featuredAds.map((item) => ({
      id: item.id,
      title: item.title?.rendered,
      price: item.locations?.Northside?.Price[0] ?? 0,
      type: "food",
      fimg_base64: item.fimg_base64,
    }));

    setAdData(transformedAdData);
  }, [foodApiData]); // Run when foodApiData changes

  useEffect(() => {
    // Function to rotate ads every 10 seconds
    const rotateAds = () => {
      let breakfastOpeningHour = 7;
      let breakfastClosingHour = 11;

      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      let nextIndex = (currentAdIndex + 1) % adData.length;

      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adData.length);
    };

    // Set up interval to rotate ads every 5 seconds
    const rotationInterval = setInterval(rotateAds, 5 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(rotationInterval);
  }, [adData]); // Run when adData changes

  let fontSizeClass = "text-8xl";
  let titleLength = adData[currentAdIndex]?.title.length;

  if (titleLength > 15) {
    fontSizeClass = "text-7xl";
  }
  if (titleLength > 25) {
    fontSizeClass = "text-6xl";
  }
  return (
    <div className="screen-height">
      {adData.length > 0 && (
        <>
          <AdImage adData={adData} index={currentAdIndex} />
          <div className="title-block bg-stone-900 drop-shadow-md p-4 rounded-t-lg">
            <h1
              className={`text-white ${fontSizeClass} font-bold drop-shadow-lg text-center p-10 tracking-wide`}
            >
              {adData[currentAdIndex]?.title}
            </h1>
          </div>
          <div
            className="hours-block relative"
            style={{
              backgroundImage: `url(${woodImage})`,
            }}
          >
            <div className="dark-overlay absolute inset-0 bg-black opacity-70"></div>
            <div className=" relative z-10 py-10 px-16">
              <div className="text-5xl">
                <h2 className="font-bold mb-4 underline">FoodLab Hours</h2>
                <p>
                  <span className="font-bold">Monday - Thursday:</span> 4:00pm -
                  8:00pm
                </p>
                <p>
                  <span className="font-bold">Friday - Saturday:</span> 8:00am -
                  8:00pm
                </p>
                <p>
                  <span className="font-bold">Sunday:</span> 8:00am - 7:00pm
                </p>
              </div>
              <hr className="divider my-6" />
              <div className="text-4xl">
                <p>
                  <span className="font-bold">Coffee:</span> Open – 2pm
                </p>
              </div>
              <hr className="divider my-6" />
              <div className="text-4xl">
                <h2 className="font-bold mb-4 underline">Bar Hours</h2>
                <p>
                  <span className="font-bold">Monday - Thursday:</span> 7:00am -
                  10:00pm
                </p>
                <p>
                  <span className="font-bold">Friday - Saturday:</span> 7:00am -
                  12:00am
                </p>
                <p>
                  <span className="font-bold">Sunday:</span> 7:00am - 8:00pm
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tv3;
