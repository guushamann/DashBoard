import Link from "next/link";
import { useState, useEffect,useRef } from "react";
import Weather from "../../components/weather";
function GridButton({ url, name }) {
  const websiteUrl = `https://${url}`
  const icoUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${url}&size=24`

  return (<div className="flex rounded-lg  px-4 py-2 bg-slate-700 gap-4">
    <div className="grow-0 "><img height="24" width="24" src={icoUrl} /></div>
    <div className="grow uppercase "><Link href={websiteUrl} target="_blank">{name}</Link></div>
  </div>);
}
function ListButton({ url, name }) {
  const websiteUrl = `https://${url}`
  return (<div className=" rounded-lg  p-4 bg-slate-700 w-full grid grid-cols-2 cursor-pointer" onClick={e=>window.open(websiteUrl)}>
    <div className="link uppercase ">{name}</div> <div className="link truncate">{websiteUrl}</div>
  </div>);
}

export default function links() {
  const inputRef = useRef(null);
  const [gridData, setGridData] = useState([])
  const [listData, setListData] = useState([])
  const [allData, setAllData] = useState([])
  const escFunction = (event) => {
    if ( event.keyCode == 27 ){
      event.target.value=''
      setListData(allData.filter(d => !d.grid));
    }
  };


  useEffect(() => {

    async function fetchData() {
      const response = await fetch('/api/storeJSONData')
      let Idata = await response.json();
      setAllData(Idata);
    }
    fetchData()
    inputRef.current.focus();
  }, [])
  useEffect(() => {
    setGridData(allData.filter(d => d.grid));
    setListData(allData.filter(d => !d.grid));
  },[allData])


  function handleChange(event) {
    setListData(allData.filter(d => !d.grid && d.name.toLowerCase().includes(event.target.value.toLowerCase())));
    
  }
  return (
    <div className="grid gap-4 justify-center">
        <Weather />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 min-[2000px]:grid-cols-8 gap-4">
          {gridData.map(buttonData => (
            <GridButton url={buttonData.url} name={buttonData.name} key={buttonData.url} />
          ))}


        </div>

      <input type="text" className="input w-full border border-slate-500 " ref={inputRef} autoFocus onKeyUp={escFunction} placeholder="Search"  onChange={handleChange}  />
      <div className="grid gap-4  justify-start grid-cols-1">
        
          {listData.map(buttonData => (
            <ListButton url={buttonData.url} name={buttonData.name} key={buttonData.url} />
          ))}


      </div>

      
    </div>
  )
}

