import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddressPopup = ({ onClose, onAddressSelect }) => {
    const [roadAddress, setRoadAddress] = useState('');
    const [jibunAddress, setJibunAddress] = useState('');

    const handleRoadAddressChange = async (event) => {
        const roadAddressValue = event.target.value;
        setRoadAddress(roadAddressValue);

        try {
            const response = await axios.get(`https://api.address.com/convert`, {
                params: {
                    roadAddress: roadAddressValue
                }
            });
            const { jibunAddress } = response.data;
            setJibunAddress(jibunAddress);
        } catch (error) {
            console.error('Error fetching jibun address:', error);
        }
    };

    const handleSelect = () => {
        onAddressSelect({ roadAddress, jibunAddress });
        onClose();
    };

    return (
        <div className="address-popup">
            <div className="popup-content">
                <h2>도로명 주소 검색</h2>
                <label htmlFor="roadAddress">도로명 주소</label>
                <input
                    type="text"
                    id="roadAddress"
                    name="roadAddress"
                    value={roadAddress}
                    onChange={handleRoadAddressChange}
                    placeholder="도로명 주소를 입력하세요"
                />
                <label htmlFor="jibunAddress">지번 주소</label>
                <input
                    type="text"
                    id="jibunAddress"
                    name="jibunAddress"
                    value={jibunAddress}
                    readOnly
                    placeholder="지번 주소"
                />
                <button onClick={handleSelect}>선택</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

AddressPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddressSelect: PropTypes.func.isRequired,
};

export default AddressPopup;
