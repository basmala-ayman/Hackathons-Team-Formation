import { Container , Row , Column } from "react-bootstrap"

function Discover() {
    const brainIcon=<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_1431_2163)">
<path d="M3 16C3 8.26801 9.26801 2 17 2H53C60.732 2 67 8.26801 67 16V52C67 59.732 60.732 66 53 66H17C9.26801 66 3 59.732 3 52V16Z" fill="white" shape-rendering="crispEdges"/>
<path d="M35 42V24.6666" stroke="#6B46C1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M39 35.3333C37.8464 34.9961 36.8331 34.2942 36.112 33.3327C35.3909 32.3712 35.0007 31.2019 35 30C34.9993 31.2019 34.6091 32.3712 33.888 33.3327C33.1669 34.2942 32.1536 34.9961 31 35.3333" stroke="#6B46C1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M42.464 26.6667C42.7708 26.1353 42.9513 25.5405 42.9914 24.9283C43.0316 24.316 42.9303 23.7027 42.6956 23.1359C42.4608 22.569 42.0987 22.0637 41.6374 21.6592C41.1761 21.2546 40.6279 20.9616 40.0353 20.8028C39.4426 20.644 38.8214 20.6237 38.2196 20.7434C37.6178 20.8631 37.0517 21.1196 36.5649 21.4931C36.0781 21.8667 35.6838 22.3472 35.4125 22.8975C35.1411 23.4478 35 24.0531 35 24.6667C35 24.0531 34.8589 23.4478 34.5875 22.8975C34.3162 22.3472 33.9219 21.8667 33.4351 21.4931C32.9483 21.1196 32.3822 20.8631 31.7804 20.7434C31.1786 20.6237 30.5574 20.644 29.9647 20.8028C29.3721 20.9616 28.8239 21.2546 28.3626 21.6592C27.9013 22.0637 27.5392 22.569 27.3044 23.1359C27.0697 23.7027 26.9684 24.316 27.0086 24.9283C27.0487 25.5405 27.2292 26.1353 27.536 26.6667" stroke="#6B46C1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M42.9961 24.8334C43.7798 25.0349 44.5074 25.4121 45.1238 25.9365C45.7401 26.4608 46.2291 27.1185 46.5536 27.8598C46.8782 28.6011 47.0297 29.4066 46.9969 30.2151C46.9641 31.0237 46.7477 31.8142 46.3641 32.5267" stroke="#6B46C1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M43 42C44.174 41.9999 45.3152 41.6125 46.2466 40.8978C47.178 40.1831 47.8475 39.181 48.1514 38.047C48.4552 36.913 48.3764 35.7104 47.9272 34.6258C47.4779 33.5411 46.6834 32.635 45.6667 32.048" stroke="#6B46C1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M45.6223 41.3107C45.7158 42.0337 45.66 42.7681 45.4585 43.4687C45.257 44.1693 44.9139 44.8211 44.4506 45.3839C43.9873 45.9468 43.4135 46.4086 42.7647 46.741C42.1159 47.0734 41.4058 47.2692 40.6784 47.3164C39.9509 47.3637 39.2215 47.2612 38.5352 47.0155C37.8488 46.7697 37.2202 46.3859 36.688 45.8877C36.1558 45.3895 35.7314 44.7874 35.4411 44.1188C35.1507 43.4501 35.0004 42.729 34.9997 42C34.9989 42.729 34.8487 43.4501 34.5583 44.1188C34.2679 44.7874 33.8435 45.3895 33.3114 45.8877C32.7792 46.3859 32.1505 46.7697 31.4642 47.0155C30.7779 47.2612 30.0484 47.3637 29.321 47.3164C28.5935 47.2692 27.8834 47.0734 27.2346 46.741C26.5858 46.4086 26.012 45.9468 25.5487 45.3839C25.0854 44.8211 24.7424 44.1693 24.5409 43.4687C24.3393 42.7681 24.2836 42.0337 24.377 41.3107" stroke="#6B46C1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.0001 42C25.8261 41.9999 24.6849 41.6125 23.7535 40.8978C22.8221 40.1831 22.1526 39.181 21.8487 38.047C21.5449 36.913 21.6237 35.7104 22.0729 34.6258C22.5222 33.5411 23.3167 32.635 24.3334 32.048" stroke="#6B46C1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.0042 24.8334C26.2205 25.0349 25.4929 25.4121 24.8765 25.9365C24.2602 26.4608 23.7712 27.1185 23.4467 27.8598C23.1222 28.6011 22.9706 29.4066 23.0034 30.2151C23.0363 31.0237 23.2527 31.8142 23.6362 32.5267" stroke="#6B46C1" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_dd_1431_2163" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_1431_2163"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1431_2163"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_1431_2163" result="effect2_dropShadow_1431_2163"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1431_2163" result="shape"/>
</filter>
</defs>
</svg>

    const featuresData=[
        {id:1,
            title:"Skill and Personality Matching",
            description:"Connect with team members based on skills & skill-set compatibility.",
            bgClass:"",
            icon:""
        },
         {id:2,
            title:"Hackathon Recommendation",
            description:"Get personalized event suggestions tailored to your profile.",
            bgClass:"",
            icon:""
        },

    ]
  return (

    <Container>
        <div className="discoverText">
            <p>Discover Powerful Features</p>
            <p>Intelligent tools to build and grow your hackathon team</p>
        </div>
      <Row>
         <Column sm={12} md={6}></Column>
         <Column sm={12} md={6}></Column>
      </Row>
    </Container>
  )
}

export default Discover
