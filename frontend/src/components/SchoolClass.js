import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import axiosInstance from "../axiosApi";
import SchoolClassesSelect from "./SchoolClassesSelect";
import ScheduleSubject from "./schedule_components/ScheduleSubject";


export default function SchoolClass({renderMessageCallback}) {
    let { id } = useParams()
    const [classSubjects, setClassSubjects] = useState(null)
    const [classStudents, setClassStudents] = useState(null)
    const [statistics, setStatistics] = useState(null)

    useEffect(() => {
        async function get_info() {
            try {
                let resp = await axiosInstance.get(`/classes/${id}/subjects/`);
                setClassSubjects(resp.data);
                resp = await axiosInstance.get(`/classes/${id}/students/`);
                setClassStudents(resp.data);
                resp = await axiosInstance.get(`/classes/${id}/statistics/`);
                setStatistics(resp.data);
            } catch (err) {
                renderMessageCallback({
                    type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data
                })
            }
        }

        get_info();
    }, [id])

    return (<>
        {
            statistics ?
                <table className="table mt-5" style={{maxWidth: '700px', margin: "0 auto"}}>
                    <thead>
                    <tr>
                        <th scope="col">Середній бал / відсоток відвідування</th>
                        {classSubjects?.map(subject => (
                            <th key={subject.id}>{subject.subject.name}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {classStudents?.map(student => (
                        <tr key={student.user.id}>
                            <th>{student.user.last_name + ' ' + student.user.first_name}</th>
                            {/*{console.log(statistics)}*/}
                            {classSubjects.map(subject => {
                                // console.log(student.user.id, subject.id)
                                console.log(statistics[student.user.id][subject.id]);

                                if (statistics[student.user.id][subject.id] === undefined) {
                                    return <td></td>
                                } else {
                                    return <td>{statistics[student.user.id][subject.id].avg_mark} /&nbsp;
                                        {statistics[student.user.id][subject.id].presense_percent}%</td>
                                }
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table> : null
        }
    </>)
}
