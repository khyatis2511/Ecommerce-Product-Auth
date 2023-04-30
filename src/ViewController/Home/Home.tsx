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
        Add Product
      </button>
      <p>Product List</p>
    </div>
  );
};

export default Home;
