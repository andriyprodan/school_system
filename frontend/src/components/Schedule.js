import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import axiosInstance from "../axiosApi";
import SchoolClassesSelect from './SchoolClassesSelect';
import ScheduleSubject from './schedule_components/ScheduleSubject';

// Компонента розкладу
export default function Schedule({renderMessageCallback}) {
    const [schedule, setSchedule] = useState(null)
    const [classId, setClassId] = useState(null)

    async function handleSchoolClassIdChange(e) {
        setClassId(e.target.value)
        try {
            let resp = await axiosInstance.get(`classes/${e.target.value}/schedule_subjects/`)
            console.log(resp)
             setSchedule(resp.data)
        } catch (err) {
            console.log(err);
        }
    }
useEffect(()=>{
    console.log(schedule)
},[handleSchoolClassIdChange, schedule])

    return (<>
        <SchoolClassesSelect renderMessageCallback={renderMessageCallback} changeCallback={handleSchoolClassIdChange}
                             style={{maxWidth: "115px", margin: "15px auto"}}/>
        {
            schedule ?
                <table className="table mt-5" style={{maxWidth: '700px', margin: "0 auto"}}>
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Понеділок</th>
                        <th scope="col">Вівторок</th>
                        <th scope="col">Середа</th>
                        <th scope="col">Четвер</th>
                        <th scope="col">П'ятниця</th>
                        <th scope="col">Субота</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <tr key={i}>
                            <th>{i}</th>
                            {[1, 2, 3, 4, 5, 6].map(j => {
                                let sch_item = schedule[i][j];
                                return <td><ScheduleSubject classId={+classId} sch_subject={sch_item} editing={!!!sch_item.subject.id}
                                                            renderMessageCallback={renderMessageCallback}/></td>
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table> : null
        }
    </>)
}