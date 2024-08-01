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
    tech: ["react", "webgl", "aws", "lambda", "cdk", "s3", "ec2", "python", "machine learning"]
  },
  {
    client: "NBC",
    project: "Quantum Leap HQ",
    tech: ["Unity", "C#", "Swift", "ARKit", "AWS", "Lambda", "SES", "S3"]
  },
  {
    client: "Paramount",
    project: "TMNT Mutant Mayhem AR Filters",
    tech: ["Spark AR", "Lens Studio", "Effect House", "Javascript", "Visual Scripting"]
  },
  {
    client: "WarnerBros",
    project: "Shazam Photobooth",
    tech: ["Unreal", "Kinect", "C++", "Blueprints"]
  },
  {
    client: "WarnerBros",
    project: "Reminiscence",
    tech: ["WebGL", "Javascript", "Blender", "MACHINE LEARNING", "Cloud RENDERING"]
  },
  {
    client: "Paramount",
    project: "Maverick photobooth",
    tech: ["Unreal", "CapacitorJS", "WEBGL", "Swift", "AR Core"]
  },
  {
    client: "Lionsgate ",
    project: "cageaissance",
    tech: ["Javascript", "WebGL", "8th Wall", "AUGMENTED REALITY", "Photogrammetry"]
  },
  {
    client: "Lionsgate ",
    project: "Moonfall",
    tech: ["Javascript", "WebGL", "8th Wall", "AUGMENTED REALITY"]
  }
]

const Work = ({ }) => {

  return <div className="work section padded-sides full-width">
    <div className='sectionTitle'>RECENT WORK</div>
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

    <div className='oblio full-row'>
      <div className='oblioCTA'>VIEW MORE OF MY WORK AND CASE STUDIES AT:</div>
      <div className="oblioLink">
        <a href="https://oblio.io">OBLIO.IO</a>
      </div>
    </div>
  </div>
}

export { Work }
