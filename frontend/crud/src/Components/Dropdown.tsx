
import axios from "axios"
import { useEffect } from "react";

const Dropdown =() => {
    const fetchCountry=async()=>{
        const response = await axios.get("http://localhost:8000/api/country")
        console.log(response.data);

    }
    useEffect(()=>{
        fetchCountry()

    })
    
  return (
    <>
    <div>Dropdown</div>
    </>
  )
}

export default Dropdown