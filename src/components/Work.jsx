'use client'

const projectData = [
  // {
  //   client: "client",
  //   project: "project",
  //   tech: []
  // },
  {
    client: "NETFLIX",
    project: "AVATAR: THE LAST AIRBENDER",
    tech: ["webgl", "react", "aws", "serverless"]
  },
  {
    client: "NETFLIX",
    project: "AVATAR: THE LAST AIRBENDER",
    tech: ["webgl", "react", "aws", "serverless", "Unity", "C#", "Swift", "AWS", "Serverless"]
  },
  {
    client: "NBC",
    project: "Quantum Leap HQ",
    tech: ["Unity", "C#", "Swift", "AWS", "Serverless"]
  },
  {
    client: "WarnerBros",
    project: "Shazam Photobooth",
    tech: ["Unreal", "Kinect", "C++", "Blueprints"]
  },
  {
    client: "WarnerBros",
    project: "Reminiscence",
    tech: ["WebGL", "Javascript", "Cloud RENDERING"]
  },
  {
    client: "Paramount",
    project: "Maverick photobooth",
    tech: ["Unreal", "CapacitorJS", "WEBGL", "Swift"]
  },
  {
    client: "Lionsgate ",
    project: "cageaissance",
    tech: ["WebGL", "AUGMENTED REALITY", "Photogrammetry"]
  },
  {
    client: "Lionsgate ",
    project: "Moonfall",
    tech: ["WebGL", "AUGMENTED REALITY"]
  }
]

const Work = ({ }) => {

  return <div className="work section full-width">
    <div className='sectionTitle'>FEATURED WORK</div>
    <div className='titles full-row'>
      <div className='client-row'>CLIENT</div>
      <div className='project-row'>PROJECT</div>
      <div className='tech-row'>TECHNOLOGIES</div>
    </div>
    <ul className='projects full-row'>
      {projectData.map((project, index) =>
        <li key={index} className="full-row">
          <div className='client-row'>{project.client}</div>
          <div className='project-row'>{project.project}</div>
          <ul className='tech-row'>
            {project.tech.map((tech, tIndex) =>
              <li key={tIndex}>{tech}</li>
            )}
          </ul>
        </li>
      )}
    </ul>
  </div>
}

export { Work }
