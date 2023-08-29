import Link from "next/link";
import { useState, useEffect } from "react";
function GridButton({ url, name }) {
  const icoUrl = `https://icons.duckduckgo.com/ip3/${url}.ico`
  const websiteUrl = `https://${url}`
  return (<button className="btn bg-slate-700">
    <img height="16" width="16" src={icoUrl} />
    <Link href={websiteUrl} target="_blank">{name}</Link>
  </button>);
}
function ListButton({ url, name }) {
  const websiteUrl = `https://${url}`
  return (<div className="flex gap-4 btn bg-slate-700">
    <a className="link" href={websiteUrl} target="_blank">{name}</a> - <a className="link" href={websiteUrl} target="_blank">{websiteUrl}</a>
  </div>);
}

export default function links() {
  const [gridData, setGridData] = useState([])
  const [listData, setListData] = useState([])
  const [allData, setAllData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/storeJSONData')
      let Idata = await response.json();

      setAllData(Idata);



    }
    fetchData()
  }, [])
  useEffect(() => {
    setGridData(allData.filter(d => d.grid));
    setListData(allData.filter(d => !d.grid));
  },[allData])


  function handleChange(event) {
    setListData(allData.filter(d => !d.grid && d.name.includes(event.target.value)));
    
  }
  return (
    <div className="grid gap-4 justify-center">

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 min-[2000px]:grid-cols-8 gap-4">
          {gridData.map(buttonData => (
            <GridButton url={buttonData.url} name={buttonData.name} key={buttonData.url} />
          ))}


        </div>

      <input type="text" className="input w-full border border-slate-500 " placeholder="Search"  onChange={handleChange}  />
      <div className="flex grow ">
        
          {listData.map(buttonData => (
            <ListButton url={buttonData.url} name={buttonData.name} key={buttonData.url} />
          ))}


      </div>

      
    </div>
  )
}

