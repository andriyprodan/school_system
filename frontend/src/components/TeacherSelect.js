import React, { useEffect, useState } from "react";

import axiosInstance from "../axiosApi";

export default function SchoolClassesSelect({renderMessageCallback, changeCallback, style}) {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        async function get_teachers() {
            try {
                let resp = await axiosInstance.get('/users/teachers/');
                setTeachers(resp.data)
            } catch (err) {
                renderMessageCallback({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
                // setMessage({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
            }
        }
        get_teachers();
    }, [])

    return (
        <select name="classId" className="form-control" id="classId" onChange={changeCallback} style={style}>
            <option disabled={true} selected> Оберіть Вчителя</option>
            {
                teachers?.map(teacher => (
                    <option value={teacher.user} key={teacher.id}>{teacher.full_name}</option>
                ))
            }
        </select>
    )
}