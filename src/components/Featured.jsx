'use client'
import { DuneBuggyScene } from "./Featured/DuneBuggy"
import FireSymbol from "./Featured/FireSymbol";

const Featured = ({ }) => {

  return (
    <>
      <div className="bodyCopy topLine" >
        I&apos;m going to leave you with this cool LITTLE DUDE I MADE. It was a lot of fun to experiment with a procedurally generated landscape and custom physics system.
      </div>
      <div className="Featured">
        <DuneBuggyScene></DuneBuggyScene>
      </div>
    </>
  )
}

export { Featured }
