import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchApiData, reserved } from "../Redux/missions/Missions";

const displayMissions = (missionTab, dispatch) => {
  const { missions }  = missionTab;
  const tab = [];
  for (let i = 0; i < missions.length; i += 1) {
    tab.push(
      <tr key={i}>
        <td>
          {missions[i].mission_name}
        </td>
        <td>
          { missions[i].description }
        </td>
        <td>
          <p className={missions[i].reserved ? 'active' : 'inactive'}>{missions[i].reserved ? 'Active Member' : 'Not A MEMBER'}</p>
        </td>
        <td>
          <button id={missions[i].mission_id} className={missions[i].reserved ? 'red' : 'join'} onClick={() => dispatch(reserved(missions[i].mission_id))} type="button">{missions[i].reserved ? 'Leave Mission' : 'Join Mission'}</button>
        </td>
      </tr>,
    );
  }
  return (tab);
};

export const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions);
  useEffect(() => {
    if (missions.missions.length === 0) {
        dispatch(fetchApiData());
    }
  }, [dispatch, missions.missions.length]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="mission">Missions</th>
            <th className="description">Description</th>
            <th className="status">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayMissions(missions, dispatch)}
        </tbody>
      </table>
    </div>
  )
}