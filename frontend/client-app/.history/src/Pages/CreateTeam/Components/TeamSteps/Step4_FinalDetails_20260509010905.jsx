import styles from './Step4.module.css'
import CustomButton from '../../../../shared/CustomButton/CustomButton'
import { CirclesIcon , TeamIcon , AddMemberIcon , CodeIcon } from '../../../../assets/Icons'


function Step4_FinalDetails({ formData, onPrev, onSubmit }) {
    const memberCount= (formData.members?.length || 0) +1;
    const skillCount =formData.skills?.length||0;
    const rolesCount =formData.roles?.length||0;

    
  return (
    <div className={styles.container}>
      <div className={styles.summaryContainer}>
        <h5 className={styles.summaryTitle}>Team Summary</h5>

        {/* Team Name */}
        <div className={styles.summaryItem}>
          <div className={styles.iconWrapper}><TeamIcon size={20} /></div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Team Name</span>
            <span className={styles.itemValue}>{formData.teamName || "Not set"}</span>
          </div>
        </div>

        {/* Hackathon Name */}
        <div className={styles.summaryItem}>
          <div className={styles.iconWrapper}><CirclesIcon /></div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Hackathon Name</span>
            <span className={styles.itemValue}>{formData.hackathonName || "Not selected"}</span>
          </div>
        </div>

        {/* Members Count */}
        <div className={styles.summaryItem}>
          <div className={styles.iconWrapper}><AddMemberIcon /></div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Team Members</span>
            <span className={styles.itemValue}>{memberCount} member{memberCount > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Skills Count */}
        <div className={styles.summaryItem}>
          <div className={styles.iconWrapper}><CodeIcon color='var(--color-primary-dark)' /></div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Required Skills</span>
            <span className={styles.itemValue}>{skillCount} skill{skillCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
           {/* Roles Count */}
        <div className={styles.summaryItem}>
          <div className={styles.iconWrapper}><CodeIcon color='var(--color-primary-dark)' /></div>
          <div className={styles.itemContent}>
            <span className={styles.itemLabel}>Required Roles</span>
            <span className={styles.itemValue}>{rolesCount} Roles{rolesCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className={styles.footerActions}>
        <CustomButton variant="secondary" size='sm' onClick={onPrev}>
          Previous
        </CustomButton>
        <CustomButton variant="primary" size='sm' onClick={onSubmit}>
          Create Team
        </CustomButton>
      </div>
    </div>
  )
}

export default Step4_FinalDetails
