import React, { useState } from "react";
import students from "./students";
import axios from "axios";

function Attendance() {
  const faculty = ["Somesh Sharma", "Rohit Jain"];

  const [Faculty, setFaculty] = useState(faculty);

  const [studentName, setStudentName] = useState([]);
  //  const [attendance,setAttendance]=useState({})
  let attendance = {};

  const [Attendance, setAttendance] = useState({});

  function handleChange(x) {
    // console.log(x);
    const tempName = students.find((obj) => {
      return obj.faculty == x;
    });

    setStudentName(tempName.names.sort());

    let temp = {};

    studentName.forEach((x) => {
      temp[x] = false;
    });
    setAttendance(temp);
    // console.log(Attendance);
  }

  // console.log(Attendance)

  function handleClick(student) {
    setAttendance((prev) => ({
      ...prev,
      [student.student]: !prev[student.student],
    }));
  }


  function absentAll(status) {
    let temp = {};

    studentName.forEach((x) => {
      temp[x] = status;
    });
    setAttendance(temp);
  
  }

  function submitAttendance(dataToSave)
  {
    
    console.log('Submit=>')
    // console.log(dataToSave)
    axios
      .post("https://attendance-api-sjkr.onrender.com/saveAttendance", dataToSave)
      .then((response) => {
        console.log(response);
      })

  }

  return (
    <div className="Container">
      <select onChange={(e) => handleChange(e.target.value)}>
        <option hidden>Select Faculty</option>
        {Faculty.map((fname) => {
          return <option>{fname}</option>;
        })}
      </select>
      <button onClick={(e) => absentAll(false)} style={{height:'40px', width:'80px', margin:'10px'}} >Absent All</button>
      <button onClick={(e) => absentAll(true)}style={{height:'40px', width:'80px', margin:'10px'}} >Present All</button>
      <button onClick={(e) =>submitAttendance(Attendance)} style={{height:'40px', width:'80px', margin:'10px'}}>Submit</button>
      <br></br>
      <br></br>

      {/* //Printing Students Name */}
      {studentName.length > 0
        ? studentName.map((student, index) => {
            return (
              <p>
                <span>{student} </span>
                &nbsp;
                <button
           
                  className= {Attendance[student] ? "attendance-btn present" : "attendance-btn absent"} 
                  onClick={() => {
                    handleClick({ student });
                  }}
                >
                 {Attendance[student] ? "P" : "A"} 
                </button>
              </p>
            );
          })
        : ""}
    </div>
  );
}
export default Attendance;
