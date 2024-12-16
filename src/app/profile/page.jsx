"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import BookingInfo from "./booking-info";
import { useContext } from "react";
import { MyContext } from "@/context/mycontext";

export default function Profile() {
  const { setMyState } = useContext(MyContext);
  const [emailCookie, setEmailCookie] = useState("");
  const [selected, setSelected] = useState();

  const listDay = selected?.map((item) => {
    const splitItem = String(item).split(" ");
    const SliceArry = splitItem.slice(0, 3).join("/");
    return SliceArry;
  });

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const cookieValue = getCookie("emailid");
    setEmailCookie(cookieValue);

    async function getData() {
      const res = await fetch(
        `http://localhost:3001/api/addMeal?email=${cookieValue}`
      );
      const data = await res.json();
      setMyState(data);
    }
    getData();
  }, []);

  const bookMyMeal = async (e) => {
    e.preventDefault();
    try {
      const todaysMeal = {
        email: emailCookie,
        breakfast: e.target.children[0].children[1].checked,
        lunch: e.target.children[1].children[1].checked,
        dinner: e.target.children[2].children[1].checked,
        listDay: listDay,
      };

      const response = await fetch("http://localhost:3001/api/addMeal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todaysMeal),
      });
      const data = await response.json();
      console.log(data);
      setMyState(data);
    } catch (err) {
      console.log("Error inside Profile :", err);
    }
  };

  return (
    <section className="flex items-center justify-around">
      <div className="h-[100vh] grid place-content-center">
        <h1 className="text-2xl font-bold mb-10">
          Hi{" "}
          {emailCookie.slice(0, emailCookie.indexOf("@")).toUpperCase() ||
            "User"}
          ,
        </h1>
        <DayPicker
          mode="multiple"
          min={0}
          max={5}
          selected={selected}
          onSelect={setSelected}
          disabled={[{ dayOfWeek: [0, 6] }, { before: new Date() }]}
        />
        <div className="mt-10">
          <form
            action=""
            className="flex gap-10"
            onSubmit={bookMyMeal}
          >
            <div className="flex gap-2 items-center">
              <label htmlFor="Breakfast">Breakfast</label>
              <input
                className="p-3 text-black rounded-md"
                type="checkbox"
                placeholder="Breakfast"
                name="Breakfast"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="Lunch">Lunch</label>
              <input
                className="p-3 text-black rounded-md"
                type="checkbox"
                placeholder="Lunch"
                name="Lunch"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="Dinner">Dinner</label>
              <input
                className="p-3 text-black rounded-md"
                type="checkbox"
                placeholder="Dinner"
                name="Dinner"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-300 text-black p-3 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <BookingInfo />
    </section>
  );
}
