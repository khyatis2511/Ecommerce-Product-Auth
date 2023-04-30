import React from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  // const [productData, setProductData] = useState();
  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/product')}
      >
        Product List
      </button>
      <p>Home page</p>
    </div>
  );
};

export default Home;
