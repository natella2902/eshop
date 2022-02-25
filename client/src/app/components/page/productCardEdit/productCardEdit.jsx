import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "../../../store/products";
import { validator } from "../../../utils/validator";
import propTypes from "prop-types";
import TextAreaField from "../../common/form/textAreaField";
import s from "./productCardEdit.module.css";

const ProductCardEdit = ({ productId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState();
    const currentProduct = useSelector(getProductById(productId));
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        dispatch(
            updateProduct(data)
        );
    };

    useEffect(() => {
        if (currentProduct && !data) {
            setData({
                ...currentProduct
            });
        }
    }, [currentProduct, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Enter name of product"
            }
        },
        text: {
            isRequired: {
                message: "Text has been not empty"
            }
        },
        price: {
            isRequired: {
                message: "Field price does not be empty"
            }
        }
    };
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container">
            <h2 className="subtitle"> Change product card </h2>
            <div className={s.form__item}>
                <div className={s.form__item}>
                    { !isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Image"
                                name="img"
                                value={data.img}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextAreaField
                                label="Text"
                                name="text"
                                value={data.text}
                                onChange={handleChange}
                                error={errors.text}
                            />
                            <TextField
                                label="Rate"
                                name="rate"
                                value={data.rate}
                                onChange={handleChange}
                                error={errors.rate}
                            />
                            <TextField
                                label="Price"
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                                error={errors.price}
                            />
                            <div className={s.btn__group}>
                                <button className={s.btn} onClick={() => history.goBack()}>
                                    <i className="bi bi-caret-left"></i> Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className={s.btn}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

ProductCardEdit.propTypes = {
    productId: propTypes.string
};

export default ProductCardEdit;
