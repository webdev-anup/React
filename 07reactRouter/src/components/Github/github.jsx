import React from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();

  return (
    <div className="text-center m-4 bg-gray-600 text-white p-4">
      Github Followers: {data?.followers}
      <img src={data?.avatar_url} alt="github avatar" width={300} />
    </div>
  );
}

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/webdev-anup");
  //
  return response.json();
};

export default Github;
