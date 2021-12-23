import React, { useEffect, useState } from "react";

import axiosInstance from "../axiosApi";

export default function ClassSubjectSelect({renderMessageCallback, changeCallback, style, classId, inline, inline_subject}) {
    const [classSubjects, setClassSubjects] = useState([]);

    async function get_subjects() {
        try {

            let resp = await axiosInstance.get(`/classes/${classId}/subjects/`);
            setClassSubjects(resp.data)
        } catch (err) {
            renderMessageCallback({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
            // setMessage({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
        }
    }

    return (
        <select name="classId" className="form-control" id="classId" onMouseDown={get_subjects} onChange={changeCallback} style={style}>
            <option disabled={true} selected={!inline}> Оберіть Предмет</option>
            {
                classSubjects?.map(classSubject => (
                    <option value={inline ? inline_subject.id : classSubject.id} key={classSubject.id}>{classSubject.subject.name}</option>
                ))
            }
        </select>
    )
}