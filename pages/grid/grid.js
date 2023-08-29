import Link from "next/link";
import { useState, useEffect } from "react";
function GridButton({ url, name }) {
  const icoUrl = `https://icons.duckduckgo.com/ip3/${url}.ico`
  const websiteUrl = `https://${url}`
  return (<button class="btn">
    <img height="16" width="16" src={icoUrl} />
    <Link href={websiteUrl} target="_blank">{name}</Link>
  </button>);
}
export default function links() {
  const [gridData, setGridData] = useState([])


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/storeJSONData')
      const data = await response.json();
      setGridData(data);
    }
    fetchData()
  }, [])

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 min-[2000px]:grid-cols-8 gap-4">
        {gridData.map(buttonData => (
          <GridButton url={buttonData.url} name={buttonData.name} />
        ))}


      </div>

    </div>
  )
}

