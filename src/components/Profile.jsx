import { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("profile")) || {
        name: "",
        education: "",
        goal: "",
        age: "",
        hours: "",
        wake: "",
        sleep: "",
        session: "",
      }
    );
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile Saved Successfully ✅");
  };

  return (
    <div className="min-h-screen bg-[#140426] text-white p-8">

      <Link to="/">
        <IoArrowBackCircleSharp className="text-4xl mb-6" />
      </Link>

      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-purple-700">

        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-8xl text-purple-400" />
        </div>

        <h1 className="text-4xl text-center font-bold mb-8">
          My Profile
        </h1>

        <div className="space-y-5">

          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-xl bg-black/30"
          />

          <input
            name="education"
            value={profile.education}
            onChange={handleChange}
            placeholder="Current Education"
            className="w-full p-3 rounded-xl bg-black/30"
          />

          <input
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            placeholder="Current Goal"
            className="w-full p-3 rounded-xl bg-black/30"
          />

          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full p-3 rounded-xl bg-black/30"
          />

          <input
            type="number"
            name="hours"
            value={profile.hours}
            onChange={handleChange}
            placeholder="Daily Available Hours"
            className="w-full p-3 rounded-xl bg-black/30"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="time"
              name="wake"
              value={profile.wake}
              onChange={handleChange}
              className="p-3 rounded-xl bg-black/30"
            />

            <input
              type="time"
              name="sleep"
              value={profile.sleep}
              onChange={handleChange}
              className="p-3 rounded-xl bg-black/30"
            />

          </div>

          <select
            name="session"
            value={profile.session}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/30"
          >
            <option value="">Preferred Study Session</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
            <option>Night</option>
          </select>

          <button
            onClick={saveProfile}
            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-xl font-bold"
          >
            Save Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;