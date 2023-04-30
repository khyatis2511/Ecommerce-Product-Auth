import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputTag from '../../View/InputTag';
import fetchData from '../../utils/fetchData';
import { GET_CATEGORY, SAVE_PRODUCT } from '../../utils/apiEndPoint';
import { msgs } from '../../utils/messages';
import SelectBox from '../../View/SelectBox';
import { OptionObj } from '../../utils/types';
import { user } from '../../Redux/user/userSlice';

const AddProduct = () => {
  const userData = useSelector(user);

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Array<OptionObj> | null>(null);
  const [categoriesError, setCategoriesError] = useState('');

  const [name, setName] = useState('');
  // const [image, setImage] = useState('');
  const [productCode, setProductCode] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [owner, setOwner] = useState('');

  const [nameError, setNameError] = useState('');
  // const [imageError, setImageError] = useState('');
  const [productCodeError, setProductCodeError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [manufactureDateError, setManufactureDateError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');

  const [saveProductMsg, setSaveProductMsg] = useState('');

  useEffect(() => {
    setOwner(userData.name);
    fetchData(GET_CATEGORY, 'GET').then((res) => {
      if (res && res.status === 200) {
        setCategories(res.data);
        setCategoriesError('');
      } else {
        setCategoriesError(msgs.somethingWrong);
      }
      setLoading(false);
    }).catch((error) => {
      if (error) {
        console.log('get category api : ', error);
        setCategoriesError(msgs.somethingWrong);
      }
      setLoading(false);
    });
  }, []);

  const onChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError('');
  };
  const onChangeProductCode = (e : React.ChangeEvent<HTMLInputElement>) => {
    setProductCode(e.target.value);
    setProductCodeError('');
  };
  const onChangePrice = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    setPriceError('');
  };
  const onChangeManufactureDate = (e : React.ChangeEvent<HTMLInputElement>) => {
    setManufactureDate(e.target.value);
    setManufactureDateError('');
  };
  const onChangeExpiryDate = (e : React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
    setExpiryDateError('');
  };
  const onChangeCategory = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCategoryError('');
  };

  const saveProduct = () => {
    const data = {
      name,
      productCode,
      price,
      category: [category],
      manufactureDate,
      expiryDate,
      owner: userData.id,
      status: 0,
    };
    fetchData(SAVE_PRODUCT, 'POST', data).then((res) => {
      if (res && res.status === 200) {
        setSaveProductMsg(res.message);
      } else {
        setSaveProductMsg(msgs.somethingWrong);
      }
    }).catch((error) => {
      if (error) {
        console.log('save product api : ', error);
        setSaveProductMsg(msgs.somethingWrong);
      }
    });
  };

  if (loading) {
    return (
      <h2>Loading...</h2>
    );
  }

  if (categoriesError) {
    return (
      <h1>{categoriesError}</h1>
    );
  }

  return (
    <div>
      <InputTag
        name="name"
        type="text"
        fieldError={nameError}
        fieldName="Name"
        onChange={onChangeName}
        placeholder="Enter Product Name"
        value={name}
      />
      <InputTag
        name="productCode"
        type="text"
        fieldError={productCodeError}
        fieldName="Product Code"
        onChange={onChangeProductCode}
        placeholder="Enter Product Code"
        value={productCode}
      />
      <InputTag
        name="price"
        type="text"
        fieldError={priceError}
        fieldName="Price"
        onChange={onChangePrice}
        placeholder="Enter Price"
        value={price}
      />
      {categories && (
      <SelectBox
        name="category"
        fieldError={categoryError}
        onChange={onChangeCategory}
        fieldName="Select Category"
        value={category}
        optionValues={categories}
      />
      )}
      <InputTag
        name="manufactureDate"
        type="date"
        fieldError={manufactureDateError}
        fieldName="Manufacture Date"
        onChange={onChangeManufactureDate}
        placeholder="Enter Manufacture Date"
        value={manufactureDate}
      />
      <InputTag
        name="expiryDate"
        type="date"
        fieldError={expiryDateError}
        fieldName="Expiry Date"
        onChange={onChangeExpiryDate}
        placeholder="Enter Expiry Date"
        value={expiryDate}
      />
      <InputTag
        name="owner"
        type="text"
        fieldName="Owner"
        placeholder="Enter Owner Name"
        value={owner}
        fieldError={msgs.productOwner}
        disabled
      />
      <button
        type="button"
        onClick={saveProduct}
      >
        Save
      </button>
      {saveProductMsg && <p>{saveProductMsg}</p>}
    </div>
  );
};

export default AddProduct;
