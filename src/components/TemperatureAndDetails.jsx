import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";

const TemperatureAndDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p> condition</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img
          src="https://openweathermap.org/img/wn/01d.png"
          alt="current weather"
          className="w-20"
        />
        <p className="text-5xl">34°</p>

        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-start">
            <UilTemperature size={18} className="mr-1" />
            <p>feels like:</p>
            <span className="ml-1 font-medium">32°</span>
          </div>

          <div className="flex font-light text-sm items-center justify-start">
            <UilTear size={18} className="mr-1" />
            <p>Humidity:</p>
            <span className="ml-1 font-medium">65%</span>
          </div>

          <div className="flex font-light text-sm items-center justify-start">
            <UilWind size={18} className="mr-1" />
            <p>Wind:</p>
            <span className="ml-1 font-medium">11 km/h</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise: <span className=" font-medium ml-1 ">06:45 AM</span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light">
          Set: <span className=" font-medium ml-1 ">07:00 PM</span>
        </p>
        <p className="font-light">|</p>
        <UilArrowUp />
        <p className="font-light">
          High: <span className=" font-medium ml-1 ">45°</span>
        </p>
        <p className="font-light">|</p>
        <UilArrowDown />
        <p className="font-light">
          Low: <span className=" font-medium ml-1 ">40°</span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureAndDetails;
