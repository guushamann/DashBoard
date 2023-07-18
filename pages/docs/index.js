import { Remarkable } from 'remarkable';
import { useState, useEffect } from "react";
const md = new Remarkable();

export default function docs() {
  const [docsData, setDocsData] = useState('')


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/storeMarkDown')
      const data = await response.text();
      console.log(data)
      setDocsData(data);
    }
    fetchData()
  }, [])

    const renderedHTML = md.render(docsData);
    const contentHtml= {__html: renderedHTML};
    
    return (
      <div class="prose prose-lg" dangerouslySetInnerHTML={ contentHtml } />
    )
  }