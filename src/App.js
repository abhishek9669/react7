import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const config = require('./config.json') 


function App() {
  const [file, setFile] = useState("");
  const [data, setData] = useState({
    percent:0,
    loaded:false
  });



  let handleChange = (e)=>{
    console.log('Changed',e[0])
    setFile(e[0])
}

 let myForm =async (e)=>{
   e.preventDefault();
   


   let data =new FormData();
   data.append('files',file)

   try {

    setData({
      percent:0,
      loaded:true
    })
    var res= await axios({
      method:'POST',
      url:`${config.bas_url}/api/upload`,
      data,
      onUploadProgress:(progress)=>{
        console.log(progress);
        setData({
          
          loaded: true,
          percent: Math.round(progress.loaded / progress.total * 100)
        })
      }
    })
    setData({
      loaded:false

    })
    toast("file uploded successfully")
    console.log(res);
     
   } catch (error) {
     console.log(error);
   }

 }
  return (
    <>
    <h1 className="text-center">File uploding</h1>
  <form className="w-50 offset-3 mt-5" onSubmit={(e)=>{myForm(e)}}>
  <div className="form-group">
    <label htmlFor="files">Email address</label>
    <input onChange={(e)=>{handleChange(e.target.files)}} type="file" className="form-control" id="files" name="files" aria-describedby="emailHelp" placeholder="select file" accept="image/*" required/>

 
      

    <small id="emailHelp" className="form-text text-muted"></small>
  </div>
  <br />
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
{
      data.loaded &&
      <div className="progress mt-3">
       <div className="progress-bar" role="progressbar" style={{width: data.percent+'%'}} aria-valuenow={data.percent} aria-valuemin={0} aria-valuemax={100}>{ data.percent }%</div>
      </div>
    }
<ToastContainer />


    </>
  );
}

export default App;
