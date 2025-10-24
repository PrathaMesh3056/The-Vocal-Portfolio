import { useEffect } from "react";

export const useGithubHandler= ( activeSection ) => {     
 useEffect(() => {
  if (activeSection === "github") {
    window.open("https://github.com/PrathaMesh3056", "_blank");
  }
}, [activeSection]);
};