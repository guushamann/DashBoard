import { useEffect } from "react";
export default function Weather() {
  useEffect(() => {
    !(function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "https://weatherwidget.io/js/widget.min.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "weatherwidget-io-js");
  }, []);
  return (
    <div className="weather">
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/nl/51d594d67/etten-leur/"
        data-label_1="ETTEN-LEUR" data-label_2="Weer"
        data-days="3"
        data-theme="gray" 
        data-basecolor="#334155"
        data-textcolor="rgb(166, 173, 186)"
        data-cloudcolor="rgb(166, 173, 186)"
      >
        ETTEN-LEUR Weer
      </a>
    </div>
  );
}