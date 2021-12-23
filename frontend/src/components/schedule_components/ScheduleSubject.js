import React, {useState, useEffect} from "react";

import ClassSubjectSelect from '../ClassSubjectSelect'
import axiosInstance from "../../axiosApi";

export default function ScheduleSubject({sch_subject, classId, renderMessageCallback, editing}) {
    const [editingState, setEditingState] = useState(editing)
    const [schSubject, setSchSubject] = useState(sch_subject)

    function renderSubject() {
        return (
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    {schSubject.subject.subject.name}<br/>
                    {schSubject.subject.teacher.full_name}
                </div>
                <i style={{cursor: "pointer"}} className="fas fa-edit" onClick={() => setEditingState(!editingState)}></i>
            </div>
        )
    }

    async function subjectChangeCallback(e) {
        try {
            let resp = await axiosInstance.patch(`/schedule/places_in_schedule/${schSubject.id}/`, {
                subject: e.target.value
            })
            setSchSubject(resp.data);
            setEditingState(false);
        } catch (err) {
            renderMessageCallback({type: {error: true}, messageHeader: "Щось пішло не так", message: err.response.data});
        }
    }

    function renderEditSubject() {
        return (
            <ClassSubjectSelect inline={!editingState} inline_subject={schSubject} renderMessageCallback={renderMessageCallback}
                                changeCallback={subjectChangeCallback}
                                classId={classId} style={{maxWidth: "120px", margin: "0", cursor: "pointer"}}/>
        )
    }

    return (
        editingState ? renderEditSubject() : renderSubject()
    )
}