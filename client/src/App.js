import { useState } from "react";
import Axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [datalist, setdatalist] = useState("");
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [birth, setbirth] = useState(new Date());
  const [profile_picture, setprofile_picture] = useState("");

  const [userList, setUserList] = useState([]);
  const [countageList, setcountageList] = useState([]);

  const getUser = ()=>{
    Axios.get("http://localhost:3001/user").then((response) =>{
      setUserList(response.data)
    })
  }

  const getCountAge = () =>{
    Axios.get("http://localhost:3001/counteachage").then((response) =>{
      setcountageList(response.data)
    })
  }

  const deleteUser = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
      setUserList(
        userList.filter((val)=>{
          return val.id != id
        })
      )
    })    
  }

  const addUser = () =>{
    Axios.post("http://localhost:3001/create",{
      datalist:datalist,
      name:name,
      surname:surname,
      birth:birth,
      profile_picture:profile_picture
    }).then(()=>{
      setUserList([
        ...userList,
        {
          datalist:datalist,
          name:name,
          surname:surname,
          birth:birth,
          profile_picture:profile_picture
        }
      ])
    })
  }


  return (
    <div className="App container">
      <h1>User income Infomation</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label className="form-label" htmlFor="datalist">
              คำนำหน้า:
            </label>
            <select class="form-select" aria-label="Default select example" 
            onChange={(event)=>{
              setdatalist(event.target.value)
            }}
            value="นาย"
           required
            >
            {/* <option selected disabled>เลือกคำนำหน้า</option> */}
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          </div>
          
          <div className="mb-3">
            <label className="form-label" >
              ขื่อ:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event)=>{
                setname(event.target.value)
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" >
              นามสกุล:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter surname"
              onChange={(event)=>{
                setsurname(event.target.value)
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" >
              วันเกิด:
            </label>
            <div>
              {/* <Calendar onChange={(event)=>{setbirth(event.target.value)}} value={birth} /> */}
              <Calendar onChange={setbirth} value={birth} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" >
              รูปโปรไฟล์:
            </label>
            <label for="formFile" class="form-label">Default file input example</label>
            <input class="form-control" type="file" id="formFile" 
              onChange={(event)=>{
                setprofile_picture(event.target.value)
              }}
            />
          </div>

          
          <button class="btn btn-success" onClick={addUser}>
            Add Employee
          </button>
        </form>
        <hr/>
        <button class="btn btn-primary" onMouseOver={getCountAge}>
            แสดงจำนวน
        </button>
        {countageList.map((val,key)=>{
          return(
              <div  className="age card" >
                <div className="card-body text_left">
                  <p className="card-text">อายุ:{val.age}</p>
                  <p className="card-text">จำนวน:{val.num}</p>
                </div>
              </div>
          )
        })}
        <button class="btn btn-primary" onMouseMove={getUser}>
            แสดงข้อมูล
        </button>
        <br/>
        {userList.map((val,key)=>{
          return(
            <div className="user card">
              <div className="card-body text_left">
                <p className="card-text">คำนำหน้า:{val.datalist}</p>
                <p className="card-text">ชื่อ:{val.name}</p>
                <p className="card-text">สกุล:{val.surname}</p>
                <p className="card-text">วันเกิด:{val.birth}</p>
                <p className="card-text">อายุ:{val.age}</p>
                <p className="card-text">รูปโปรไฟล์:{val.profile_picture}</p>

                <button className="btn btn-danger" onClick={() => {deleteUser(val.id)}}>Delete</button>

              </div>
            </div>
          )
        })}

      </div>
    </div>
  );
}

export default App;
