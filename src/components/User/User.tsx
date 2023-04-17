import { useNavigate } from 'react-router-dom';

export default function User() {
  const navigate = useNavigate();
  return <div onClick={() => navigate('/')}>Back</div>;
}
