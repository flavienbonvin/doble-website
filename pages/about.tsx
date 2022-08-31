import Prism from "prismjs"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { markdown } from "../constants/doc"
import Image from "next/image"
import Head from "next/head"
require("prismjs/components/prism-json")

const About = () => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <Head>
        <title>Doble Art - About the project</title>
        <meta
          name="description"
          content="How this project was build and how long did it took"
        />
      </Head>
      <div className="prose mx-auto mb-10">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <div className="flex w-full place-content-center">
        <Image
          src="/architecture.jpg"
          width={2056}
          height={1124}
          alt="architecture of the project"
        />
      </div>
    </>
  )
}

export const config = {
  runtime: "experimental-edge",
}

export default About
