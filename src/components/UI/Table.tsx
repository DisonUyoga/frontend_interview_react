import React from "react";
import TableCard from "../TableCard";
import { NearEarthObjects } from "@/util/types";
import useModalContext from "@/context/useModalContext";

interface TableProps {
  data: NearEarthObjects[][][] | undefined;
}

function Table({ data }: TableProps) {
  const { loadObjects } = useModalContext();
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols mt-4">
          <thead>
            <tr>
              <th>Asteroid_id</th>
              <td>Time</td>
              <td>Astroid Name</td>
              <td>Potential Hazard</td>
              <td>Estimated Diameter</td>
              <td>Miss Distance</td>
              <td>Velocity</td>
              <td>Note</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((asteroidsPerDay) => {
                let asteroid_combined_data: NearEarthObjects[] | undefined;
                for (let i = 0; i < asteroidsPerDay.length; i++) {
                  asteroid_combined_data = [...asteroidsPerDay[i]];
                }

                return asteroid_combined_data
                  ?.slice(0, 10)
                  .reverse()
                  .map((asteroid, index) => (
                    <TableCard key={index} data={asteroid} />
                  ));
              })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <td>Time</td>
              <td>Astroid Name</td>
              <td>Potential Hazard</td>
              <td>Estimated Diameter</td>
              <td>Miss Distance</td>
              <td>Velocity</td>
              <td>Note</td>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Table;
