import axios from "axios";
import { useState } from "react";
import { BACKEND_API } from "../actions/config";

const mutateData = async (url, method, data, content) => {
  const config = {
    method: method,
    url: `${BACKEND_API}/${url}`,
    header: {
      "Content-Type": content ? `${content}` : "application/json",
    },
  };

  if (data && Object.keys(data).length > 0) {
    config.data = data;
  }

  try {
    const res = await axios(config);
    return res;
  } catch (error) {
    console.log(`mutate data error ${url}:`, error);
    throw error;
  }
};

export default mutateData;
