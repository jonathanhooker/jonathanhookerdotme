'use client'
import { DuneBuggyScene } from "./Featured/DuneBuggy"
import FireSymbol from "./Featured/FireSymbol";

const Featured = ({ }) => {

  return (
    <>
      <div className="bodyCopy topLine" >
        CHECK OUT THIS COOL LITTLE DUNE BUGGY. THIS WAS AN EXPERIMENT THAT I BUILT TO COMPARE ALL OF THE POPULAR AR PLATFORMS A FEW YEARS AGO. THE LOOPING LANDSCAPE WAS PROCEDURALLY GENERATED AND THE PHYSICS ARE A CUSTOM SYSTEM THAT I BUILT FROM SCRATCH.
      </div>
      <div className="Featured">
        <DuneBuggyScene></DuneBuggyScene>
      </div>
    </>
  )
}

export { Featured }
