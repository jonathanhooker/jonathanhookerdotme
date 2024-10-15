'use client'

const About = ({ }) => {

  return (
    <div className="about section padded-sides full-width">
      <div className='sectionTitle'>CREATIVE DIRECTOR, DESIGNER, ENGINEER <span className="emphasized">AND MORE</span></div>
      <div className='bodyCopy'>
        <p>I&apos;m a creative with 15 years of experience leading both design and engineering teams. With 100+ successful projects under my belt I know how to take a project from concept to completion. I prefer to be in the trenches with my team helping in whatever way makes the most sense. That could be pair programming, building mood boards, prototyping a concept, or anything else that needs to be done. </p>
        <p>I believe that learning is a life long journey and I incorporate constant learning into my process. I enjoy picking up new techniques and applications that my team can benefit from and bringing them back to the team. </p>
        <p>My clients include some of the largest brands in the world such as Warner Bros, Paramount Pictures, Netflix, Puma, and Peloton.</p>
      </div>
      {/* <div className="spacer"></div> */}
      <div className="spacer"></div>
      <div className="lists">
        <div className='listBox languages'>
          <div className="listTitle">LANGUAGES</div>
          <ul>
            <li>Javascript</li>
            <li>Python</li>
            <li>Swift</li>
            <li>C#</li>
            <li>C++</li>
          </ul>
        </div>
        <div className='listBox awards'>
          <div className="listTitle">AWARDS</div>
          <ul>
            <li>7x &nbsp;Awwwards</li>
            <li>18x FWA</li>
            <li>9x &nbsp;CSS Design Award</li>
            <li>1x &nbsp;Webby</li>
            <li>5x &nbsp;W3</li>
          </ul>
        </div>
      </div>
    </div >
  )
}

export { About }
