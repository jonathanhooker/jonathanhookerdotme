'use client'
import { DuneBuggyScene } from "./Featured/DuneBuggy"
import FireSymbol from "./Featured/FireSymbol";

const Featured = ({ }) => {

  return (
    <>
      <div className="bodyCopy topLine" >
        CHECK OUT THIS COOL LITTLE DUDE I MADE. THE LOOPING LANDSCAPE WAS PROCEDURALLY GENERATED AND THE PHYSICS ARE A CUSTOM SYSTEM. DON&apos;T BREAK YOUR COCCYX.
      </div>
      <div className="Featured">
        <DuneBuggyScene></DuneBuggyScene>
      </div>
    </>
  )
}

export { Featured }
