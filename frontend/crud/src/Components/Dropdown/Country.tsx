
import axios from "axios"
import { useEffect, useState } from "react";

const Country =() => {

    const [country,setCountry] = useState([])
    const [state,setState] = useState([])
    const [city,setCity] = useState([])

    const  [countryCode,setCountryCode] = useState("")
    const  [StateCode,setStateCode] = useState("")

    const fetchCountry=async()=>{
        const response = await axios.get("http://localhost:8000/api/country")
        console.log(response.data.Country);
        setCountry(response.data.Country)
        console.log(response.data.Country);

    }
    useEffect(()=>{
        fetchCountry()

    },[])
    const fetchState=async()=>{
        const response = await axios.get(`http://localhost:8000/api/state?countryCode=${countryCode}`)
        console.log(response.data.State);
        setState(response.data.State)
        console.log(response.data.State);

    }
    useEffect(()=>{
        if(countryCode){
            fetchState()
        }
    },[countryCode])

    const fetchCity=async()=>{
        const response = await axios.get(`http://localhost:8000/api/city?stateCode=${StateCode}`)
        console.log(response.data.city);
        setCity(response.data.city)
        console.log(response.data.city);

    }
    useEffect(()=>{
        if(StateCode){
            fetchCity()
        }
    },[countryCode])
  return (
    <>
    <div className="container">
    <div className="row">
        <div className="col-4">
        Country List : <select onChange={(e)=>setCountryCode(e.target.value)} >
            {
                country?.map((element:any)=>{
                    return(
                        <>
                            <option value={element.countryCode}>{element.countryName}</option> 
                        </>
                    )
                })
            }
               
            </select>
        </div>
        <div className="col-4">
            State List : <select onChange={(e)=>setStateCode(e.target.value) }>
            {
                state?.map((element:any)=>{
                    return(
                        <>
                            <option value={element.stateCode}>{element.stateName}</option> 
                        </>
                    )
                })
            }
               
            </select></div>
        <div className="col-4">
            City List : <select >
            {
                city?.map((element:any)=>{
                    return(
                        <>
                            <option value={element.cityCode}>{element.cityName}</option> 
                        </>
                    )
                })
            }
               
            </select></div></div>
    </div>
    </>
  )
}

export default Country