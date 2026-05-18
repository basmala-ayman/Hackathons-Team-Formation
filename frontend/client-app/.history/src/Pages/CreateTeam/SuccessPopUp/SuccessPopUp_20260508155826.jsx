import styles from './SuccessPopUp.module.css'
import { SparkleIcon } from '../../../assets/Icons'
import CustomButton from '../../../shared/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom';
function SuccessPopUp({ teamName, onClose}) {

    const navigate = useNavigate();

  const handleGotIt = () => {
    onClose();
    navigate('/'); 
  };
  return (
    <div>
      
    </div>
  )
}

export default SuccessPopUp
