import Prism from "prismjs"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { markdown } from "../constants/doc"
require("prismjs/components/prism-json")

const About = () => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="prose mx-auto">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}

export default About
