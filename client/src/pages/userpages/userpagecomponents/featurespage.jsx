import React from "react";

// icons
import { FaWifi } from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";
import { IoIosTv } from "react-icons/io";
import { MdPets } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaKitchenSet } from "react-icons/fa6";
import { LuRefrigerator } from "react-icons/lu";
import { TbAirConditioning } from "react-icons/tb";
import { PiBathtub } from "react-icons/pi";

const FeaturesPage = ({ selected, onChange }) => {
  function handleCBClick(e) {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }

  return (
    <>
      <label className="feature-box">
        <input
          checked={selected.includes("Wifi")}
          name="Wifi"
          type="checkbox"
          onChange={handleCBClick}
          className="hidden peer"
        />
        <div className="flex items-center gap-2 p-4 rounded-xl cursor-pointer bg-gray-50 border-2 peer-checked:border-primary peer-checked:bg-primary/5 transition">
          <FaWifi className="text-gray-600" />
          <span>Wifi</span>
        </div>
      </label>
      <label className="feature-box">
        <input
          checked={selected.includes("Free parking")}
          name="Free parking"
          type="checkbox"
          onChange={handleCBClick}
          className="hidden peer"
        />
        <div className="flex items-center gap-2 p-4 rounded-xl cursor-pointer bg-gray-50 border-2 peer-checked:border-primary peer-checked:bg-primary/5 transition">
          <FaSquareParking className="text-gray-600" />
          <span>Free parking</span>
        </div>
      </label>
      <label className="feature-box">
        <input
          checked={selected.includes("TV")}
          name="TV"
          type="checkbox"
          onChange={handleCBClick}
          className="hidden peer"
        />
        <div className="flex items-center gap-2 p-4 rounded-xl cursor-pointer bg-gray-50 border-2 peer-checked:border-primary peer-checked:bg-primary/5 transition">
          <IoIosTv className="text-gray-600" />
          <span>TV</span>
        </div>
      </label>
      <label className="feature-box">
        <input
          checked={selected.includes("Pets")}
          name="Pets"
          type="checkbox"
          onChange={handleCBClick}
          className="hidden peer"
        />
        <div className="flex items-center gap-2 p-4 rounded-xl cursor-pointer bg-gray-50 border-2 peer-checked:border-primary peer-checked:bg-primary/5 transition">
          <MdPets className="text-gray-600" />
          <span>Pets</span>
        </div>
      </label>
      <label className="feature-box">
        <input
          checked={selected.includes("Private entrance")}
          name="Private entrance"
          type="checkbox"
          onChange={handleCBClick}
          className="hidden peer"
        />
        <div className="flex items-center gap-2 p-4 rounded-xl cursor-pointer bg-gray-50 border-2 peer-checked:border-primary peer-checked:bg-primary/5 transition">
          <RiGitRepositoryPrivateFill className="text-gray-600" />
          <span>Private entrance</span>
        </div>
      </label>
      <label className="feature-box">
        <input
          checked={selected.includes("kitchen")}
          name="kitchen"
          type="checkbox"
          onChange={handleCBClick}
          className="hidden peer"
        />
        <div className="flex items-center gap-2 p-4 rounded-xl cursor-pointer bg-gray-50 border-2 peer-checked:border-primary peer-checked:bg-primary/5 transition">
          <FaKitchenSet className="text-gray-600" />
          <span>Kitchen</span>
        </div>
      </label>
      <label className="feature-box">
        <input
          checked={selected.includes("Refrigerator")}
          name="Refrigerator"
          type="checkbox"
          onChange={handleCBClick}
          className="hidden peer"
        />
        <div className="flex items-center gap-2 p-4 rounded-xl cursor-pointer bg-gray-50 border-2 peer-checked:border-primary peer-checked:bg-primary/5 transition">
          <LuRefrigerator className="text-gray-600" />
          <span>Refrigerator</span>
        </div>
      </label>
      <label className="feature-box">
        <input
          checked={selected.includes("Air conditioning")}
          name="Air conditioning"
          type="checkbox"
          onChange={handleCBClick}
          className="hidden peer"
        />
        <div className="flex items-center gap-2 p-4 rounded-xl cursor-pointer bg-gray-50 border-2 peer-checked:border-primary peer-checked:bg-primary/5 transition">
          <TbAirConditioning className="text-gray-600" />
          <span>Air conditioning</span>
        </div>
      </label>
      <label className="feature-box">
        <input
          checked={selected.includes("Bathtub")}
          name="Bathtub"
          type="checkbox"
          onChange={handleCBClick}
          className="hidden peer"
        />
        <div className="flex items-center gap-2 p-4 rounded-xl cursor-pointer bg-gray-50 border-2 peer-checked:border-primary peer-checked:bg-primary/5 transition">
          <PiBathtub className="text-gray-600" />
          <span>Bathtub</span>
        </div>
      </label>
    </>
  );
};

export default FeaturesPage;
