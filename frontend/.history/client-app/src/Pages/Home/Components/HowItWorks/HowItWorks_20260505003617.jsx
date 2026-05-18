import styles from './HowItWorks.module.css'
function HowItWorks() {
  return (
    <div className={`${styles.containerWrapper}  py-5 text-center`}>

<section className="mb-5">
        <h2 className="fw-bold mb-5">How It Works</h2>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
          {/* {steps.map((step, index) => (
            <StepItem 
              key={step.id} 
              step={step} 
              isLast={index === steps.length - 1} 
            />
          ))} */}
        </div>
      </section>
      
    </div>
  )
}

export default HowItWorks

