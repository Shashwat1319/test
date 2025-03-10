import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const fetchdata = async () => {
    // const res = await axios.get("https://fakestoreapi.com/products");
    const res = await axios.get(`http://localhost:8000/pdata?page=${page}&limit=${limit}&name=${name}&Duration=${duration}`);
    setData(res.data.data);
    console.log(res.data);
    setTotal(res.data.total)
    setTotalPage(res.data.totalPage)
  };
  useEffect(() => {
    fetchdata();
  }, [page,limit,name,duration]);
  //   console.log(data);
  // useEffect(() => {
  //   console.log(search);
  //   var result = data.filter((item: any) => {
  //     return item.Name && item.Name.includes(search);
  //   });

  //   if (search.length <= 0) {
  //     console.log(result);
  //     setData(result);
  //     fetchdata();
  //   } else {
  //     setData(result);
  //   }
  // }, [search]);

  return (
    <>
      {/* <hr />
<div className="container">
  <div className="row ">
    <div className="col-sm-4">
      One of three columns
    </div>
    <div className="col-sm-4">
      One of three column
    </div>
    <div className="col-sm-4">
      One of three columns
    </div>
  </div>
</div>
<hr /> */}

      <div className="container">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <div className="table-responsive">
              <input
                type="text"
                placeholder="Search Name......"
                className="mb-2 mt-3 form-control w-50"
                onChange={(e: any) => setName(e.target.value)}
              />
               <input
                type="number"
                placeholder="Search Duration......"
                className="mb-2 mt-3 form-control w-50"
                onChange={(e: any) => setDuration(e.target.value)}
              />
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <th>S No</th>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Pulse</th>
                  <th>Maxpulse</th>
                  {/* <th>Description</th> */}
                  <th>Calories</th>
                </thead>
                <tbody>
                  {data.map((products: any, index) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{products.Name}</td>
                          <td>{products.Duration}</td>
                          <td>{products.Pulse}</td>
                          <td>{products.Maxpulse}</td>
                          <td>{products.Calories}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
             
            
          </div>
          <div className="col-1">
          </div>
          <div className="row">
            <div className="col-2">{(page-1)*limit+1} to {Math.min(page*limit,total)} of {total}</div>

            <div className="col-5">
           Limit <select onClick={(e)=>setLimit((e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>

            </div>
            <div className="col-5">
                <ul className="pagination">
                  <li className={`page-item ${page<=1?'disabled':' '} `}  ><a onClick={()=>setPage(page-1)} className="page-link" >Previous</a></li>
                  <li className="page-item"><a className="page-link" >{page}</a></li>
                  <li className={`page-item  ${page>=totalPage?'disabled':' '}`}   ><a onClick={()=>setPage(page+1)} className="page-link">Next</a></li>
                </ul>
            </div> 
          </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Table;
