'use client'

const About = ({ }) => {

  return (
    <div className="about section full-width">
      <div className='sectionTitle'>What Do I Do?</div>
      {/* <div className='bodyCopy'>I'm a creative engineer: I love to code and I love using that skill to make cool things. I started my career as a visual designer but quickly found that my tech side took over.</div>
      <div className='bodyCopy'>Over the last 20 years I've had the opportunity to build websites, games, mobile and desktop apps, AR filters, and photobooths for some amazing clients.</div>
      <div className='bodyCopy'>I see learning as a life long journey. I'm constantly experimenting with new applications and coding languages. The harder a challenge is, the more it excites me.</div> */}
      <div className='bodyCopy'>
        <p>That can be hard to answer succintly since I wear a lot of hats, but the short answer is that I&apos;m a creative engineer: I love to code and I love using that skill to make cool things.</p>
        <p>I started my career as a visual designer but quickly found that my tech side took over. Over the last 20 years I&apos;ve had the opportunity to build websites, games, mobile and desktop apps, AR filters, and photobooths for some amazing clients.</p>
        <p>I see learning as a life long journey. I&apos;m constantly experimenting with new applications and coding languages. The harder a challenge is, the more it excites me.</p>
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
            <li>Awwwards</li>
            <li>FWA SOTD</li>
            <li>CSS Design Award</li>
            <li>Webby</li>
            <li>W3</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { About }
