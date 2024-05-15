import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const BASEURL = "https://neowsapp.com/";
const token = process.env.NEXT_PUBLIC_API_KEY;
const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: { Authorization: "Bearer " + token },
});

export async function getAsteroid(
  start_date: string | null,
  end_date: string | null
) {
  const URL = `/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&detailed=false`;

  return (await axiosInstance.get(URL)).data;
}

export async function postComment(comment: string | undefined) {
  return (await axiosInstance.post("/rest/v1/feed", comment)).data;
}
