import { useContext, memo } from "react";
import { MyContext } from "@/context/mycontext";

function BookingInfo() {
  const { myState } = useContext(MyContext);

  const meals =
    myState?.latestUserData?.[0]?.meals || myState?.[0]?.meals || [];

  return (
    <section>
      <div>
        <h1 className="text-4xl mb-10">Booking Info :</h1>
        <div className="flex flex-col gap-2 h-96 overflow-scroll">
          {meals.map((item) => {
            return (
              <div
                className="border border-red-300 rounded-md p-2"
                key={item?.id}
              >
                <h2>
                  Meals : {item.breakfast === "true" && "Breakfast"}
                  {item.lunch === "true" && " Lunch"}
                  {item.dinner === "true" && " Dinner"}
                </h2>
                <div>
                  <p className="my-3">Date:</p>
                  {item?.listDay?.map((value) => {
                    return <p key={Math.random()}>{value}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(BookingInfo);
