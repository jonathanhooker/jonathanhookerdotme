'use client'

const About = ({ }) => {

  return (
    <div className="about section padded-sides full-width">
      {/* <div className='sectionTitle'>People often ask me <span className="emphasized">“What Do You Do?”</span></div> */}
      <div className='sectionTitle'>You know that thing, when you&apos;re at a party and someone asks <span className="emphasized">“What Do You Do?”</span></div>
      <div className='bodyCopy'>
        <p>That question is hard for me because I love what I do and I want to say too much. I want to tell them how I design, but also how I code. I want to explain that everyday is different because I explore new technologies and work on super cool projects.</p>
        <p className="emphasize">The short answer is that I&apos;m a creative engineer: I live somewhere in the intersection of tech and art.</p>
        <p>Over the last 20 years I&apos;ve had the opportunity to build websites, games, mobile and desktop apps, AR filters, and photobooths for some amazing clients.</p>
        <p>I see learning as a lifelong journey. I&apos;m constantly experimenting with new applications and coding languages. The harder a challenge is, the more it excites me.</p>
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
