import React, {useState, useEffect} from 'react';
import regeneratorRuntime from "regenerator-runtime";
import {useNavigate} from 'react-router-dom';
import {Message} from 'semantic-ui-react';

import axiosInstance from "../axiosApi"
import SchoolClassesSelect from "./SchoolClassesSelect";
import ClassSubjectSelect from "./ClassSubjectSelect";
import TeacherSelect from "./TeacherSelect";


export default function AddLesson({renderMessageCallback}) {
    const [date, setDate] = useState('');
    const [teacherId, setTeacherId] = useState(null);
    const [schoolClassId, setSchoolClassId] = useState(null);
    const [schoolClassSubjectId, setSchoolClassSubjectId] = useState(null);

    let navigate = useNavigate();

    function handleDateChange(e) {
        setDate(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            date: date,
            subject: schoolClassSubjectId,
            teacher: teacherId,
        }
        try {
            let resp = await axiosInstance.post('/accounting/lessons/', data);
            renderMessageCallback({type: {info: true}, messageHeader: "Успіх!", message: "Урок успішно додано"});
            // setMessage({type: {info: true}, messageHeader: "Успіх!", message: "Студента успішно додано"});
            console.log(resp.data.id)
            navigate(`/lesson/${resp.data.id}`);
        } catch (err) {
            renderMessageCallback({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data})
            // setMessage({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
        }
    }

    function handleSchoolClassIdChange(e) {
        console.log(e.target.value)
        setSchoolClassId(e.target.value)
    }

    function handleClassSubjectIdChange(e) {
        setSchoolClassSubjectId(+e.target.value)
    }

    function handleTeacherIdChange(e) {
        console.log('123',e.target.value)
        setTeacherId(+e.target.value)
    }

    return (
        <div style={{maxWidth: '400px', margin: "0 auto"}}>
            <div className="form-group">
                <SchoolClassesSelect renderMessageCallback={renderMessageCallback}
                                     changeCallback={handleSchoolClassIdChange}
                                     style={{maxWidth: "115px", margin: "15px auto"}}/>
            </div>
            {
                schoolClassId ?
                    <div className="form-group">
                        <ClassSubjectSelect classId={schoolClassId} renderMessageCallback={renderMessageCallback}
                                            changeCallback={handleClassSubjectIdChange}
                                            style={{maxWidth: "150px", margin: "15px auto"}}/>
                    </div> : null
            }
            {
                schoolClassId && schoolClassSubjectId ?
                    <>
                        <div className="form-group">
                            <label>Дата проведення</label>
                            <input type="date" className="form-control" name="date" value={date}
                                   onChange={handleDateChange}/>
                        </div>
                        <div className="form-group">
                            <TeacherSelect classId={schoolClassId} renderMessageCallback={renderMessageCallback}
                                           changeCallback={handleTeacherIdChange}
                                           style={{maxWidth: "150px", margin: "15px auto"}}/>
                        </div>

                        <div className="form-group d-flex justify-content-center">
                            <button className="btn btn-success mt-3" onClick={handleSubmit}>Додати урок</button>
                        </div>
                    </> : null
            }

        </div>
    )
}