import { useState } from "react";
import { DateTime } from "luxon";

export function Calender(){
    const [Umonth, setUMonth] = useState(DateTime.local().month - 1);
    const [Uyear, setUYear] = useState(DateTime.local().year - 1);

    function fillCalender(){
        let date = DateTime.local(Uyear,Umonth);
        let days = date.daysInMonth;
        let firstDay = date.startOf('month').month;
        let lastDay = date.endOf('month').c.month;
        let calender = [];
        console.log(firstDay);
        console.log(lastDay);
        
    }
    return (
        <>
            <div className="Calender">
                <div className="Calender_Header">
                    <div className="Calender_Header_Month">
                        <button className="Calender_Header_Month_Arrow">◀</button>
                        <div className="Calender_Header_Month_Name">Mars</div>
                        <button className="Calender_Header_Month_Arrow">▶</button>
                    </div>
                    <div className="Calender_Header_Year">
                        <button className="Calender_Header_Year_Arrow">◀</button>
                        <div className="Calender_Header_Year_Name">2021</div>
                        <button className="Calender_Header_Year_Arrow">▶</button>
                    </div>
                </div>
                <div className="Calender_Body">
                    <div className="Calender_Body_Days">
                        <div className="Calender_Body_Days_Day">Lun</div>
                        <div className="Calender_Body_Days_Day">Mar</div>
                        <div className="Calender_Body_Days_Day">Mer</div>
                        <div className="Calender_Body_Days_Day">Jeu</div>
                        <div className="Calender_Body_Days_Day">Ven</div>
                        <div className="Calender_Body_Days_Day">Sam</div>
                        <div className="Calender_Body_Days_Day">Dim</div>
                    </div>
                    <div className="Calender_Body_Dates">

                        {fillCalender()}


                    </div>



                </div>
            </div>

        </>
    )
}