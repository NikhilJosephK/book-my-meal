"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MyContext } from "@/context/mycontext";

export default function Login() {
  const { setMyState } = useContext(MyContext);

  const router = useRouter();
  async function sendData(e) {
    e.preventDefault();
    const emailField = e.target.children[0].value;
    try {
      const data = await fetch("http://localhost:3001/api/adduser/", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailField }),
      });

      const res = await data.json();
      if (res.userExists) {
        document.cookie = `emailid = ${e.target.children[0].value}`;
        router.push("/profile/");
        setMyState(emailField);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {/* <LoginHeading /> */}
      <h1 className="text-center mb-10 text-2xl font-bold">Login Form</h1>
      <form
        action=""
        onSubmit={sendData}
        className="flex flex-col gap-5 "
      >
        <input
          type="email"
          className="text-black p-2 rounded-lg outline-none placeholder:text-center"
          placeholder="Email Id"
        />
        <button
          type="submit"
          className="bg-red-300 rounded-lg p-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
