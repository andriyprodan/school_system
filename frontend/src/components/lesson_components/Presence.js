import React from 'react';

import axiosInstance from "../../axiosApi";

export default function Presence({wasPresent, studentLessonDataId, presenseChangeCallback}) {

    async function handlePresenseChange(e) {
        let resp = await axiosInstance.patch(`/accounting/student_lesson/${studentLessonDataId}/`, {
            'was_present': e.target.checked
        });
        presenseChangeCallback(resp.data.was_present, studentLessonDataId);
    }

    return (
        <input type="checkbox" checked={wasPresent} onChange={handlePresenseChange}/>
    )
}