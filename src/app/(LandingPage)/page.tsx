"use client";

import Table from "@/components/UI/Table";
import styles from "@/components/styles/Home.module.css";
import useObjectContext from "@/context/useModalContext";
import { useAsteroids } from "@/services/queries";
import { NearEarthObjects } from "@/util/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { FaArrowLeft } from "react-icons/fa";
import ReactPaginate from "react-paginate";

type ValuePiece = Date | null | any;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Home() {
  const [startDateValue, setStartDateOnChange] = useState<Value>(new Date());
  const [endDateValue, setEndDateOnChange] = useState<Value>(new Date());
  const [start, setStart] = useState(true);
  const [end, setEnd] = useState(false);
  const [todayDate, setTodayDate] = useState<Value | null>(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { setLoadObjects } = useObjectContext();
  const [toggleModal, setToggleModal] = useState(false);
  const [asteroidData, setAsteroidData] = useState<NearEarthObjects[][][]>();
  const date_format = "yyyy-MM-dd";
  const d_today = todayDate != null ? format(todayDate, date_format) : null;
  const d_start =
    todayDate != null ? d_today : format(new Date(startDateValue), date_format);

  const d_end =
    todayDate != null ? d_today : format(new Date(endDateValue), date_format);

  const { data, isPending, error, isError, isFetching, isFetched } =
    useAsteroids(d_start, d_end);

  useEffect(() => {
    if (isFetched) {
      setAsteroidData((prev) => [Object.values(data?.near_earth_objects)]);
    }
  }, [isPending, d_start, d_end, todayDate]);
  useEffect(() => {}, [d_start, d_end, todayDate]);
  const handleModal = () => {
    setToggleModal(!toggleModal);
    setLoadObjects(true);
  };
  const toggleCalendar = () => {
    setStart(!start);
    setEnd(!end);
    setTodayDate(null);
  };
  const goToNextPage = () => {
    const url = data?.links.next;
    const params = new URL(url);
    const urlsp = params.searchParams;
    setStartDateOnChange(urlsp.get("start_date"));
    setEndDateOnChange(urlsp.get("end_date"));
  };
  const goToPreviousPage = () => {
    const url = data?.links.prev;
    const params = new URL(url);
    const urlsp = params.searchParams;
    const d_start = urlsp.get("start_date");
    const d_end = urlsp.get("end_date");
    setStartDateOnChange(d_start);
    setEndDateOnChange(d_end);
  };

  return (
    <div>
      {toggleModal && (
        <div className={styles.modal}>
          <FaArrowLeft className="ml-12 mt-12 text-2xl" onClick={handleModal} />
          <div className={styles.calendar}>
            <div className="flex gap-4 mb-2">
              <button
                className={
                  start ? "btn btn-sm btn-secondary text-white" : "btn btn-sm"
                }
                onClick={toggleCalendar}
              >
                Start Date
              </button>
              <button
                className={
                  end ? "btn btn-sm btn-info text-white" : "btn btn-sm"
                }
                onClick={toggleCalendar}
              >
                End Date
              </button>
              <button
                className={
                  todayDate != null
                    ? "btn btn-sm btn-info text-white"
                    : "btn btn-sm"
                }
                onClick={() => setTodayDate(new Date())}
              >
                Today
              </button>
            </div>
            {start && (
              <Calendar
                onChange={setStartDateOnChange}
                value={startDateValue}
              />
            )}
            {end && (
              <Calendar onChange={setEndDateOnChange} value={endDateValue} />
            )}
          </div>
        </div>
      )}
      <button
        className="hover:underline cursor-pointer mb-4 text-xl text-white"
        onClick={handleModal}
      >
        Click here to List Near Earth Objects with Specific Date Range:
      </button>
      <br />
      {data?.element_count > 0 && (
        <span className="mb-4">
          <strong>Element Count:</strong> {data?.element_count}
        </span>
      )}

      {isPending ? (
        <span className="loading loading-dots loading-lg m-auto block" />
      ) : isError ? (
        <span className="text-red-600 text-sm text-center">
          {error?.message && "No data within this range"}
        </span>
      ) : (
        <Table data={asteroidData} />
      )}
      <div className="m-auto max-w-[200px] mt-5">
        <div className="join grid grid-cols-2">
          <button
            className="join-item btn btn-outline btn-sm text-sm"
            onClick={() => goToPreviousPage()}
          >
            Prev
          </button>
          <button
            className="join-item btn btn-outline btn-sm text-sm"
            onClick={() => goToNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
