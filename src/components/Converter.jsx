import React from 'react';
import { useState } from 'react';
import axios from 'axios';


const Converter = (props) => {
    var response;
    var rateArr = [];
   
    const [value, setValue] = useState('');
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState('');

    async function fetchDataNew() {
        response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    }
    fetchDataNew();

    let quantity;
    let secondСurrency;
    let regular;

    function getAmount() {
        let sizeTwo = { value }.value;                //  entered string
        let moneySize = sizeTwo.indexOf(' ');        //  length of entered amount
        quantity = sizeTwo.slice(0, moneySize);     //  retrieved amount                                   
        let firstСurrency = (sizeTwo.slice(moneySize + 1, moneySize + 4)).toUpperCase()
        secondСurrency = (sizeTwo.slice(moneySize + 8, moneySize + 12)).toUpperCase();
        let moneyArr = response.data;

        regular = /[0-9]+\s[a-z]{3}\sin\s[a-z]{3}$/.test(sizeTwo);
        if (regular !== true) {
            alert('Проверьте правильность введения данных! Данные вводятся в виде: сумма(пробел)валюта(пробел)in(пробел)валюта. Валюта вводится только латинскими буквами')
            quantity = 'Ошбика';
        }

        for (let obj of moneyArr)
        {
            if (firstСurrency === 'UAH')
            {
                if (obj.cc === secondСurrency) { quantity = (quantity / obj.rate).toFixed(3); }
            }
            else if (secondСurrency === 'UAH')
            {
                if (obj.cc === firstСurrency) {quantity = (obj.rate * quantity).toFixed(3);}    
            }
            else if (secondСurrency !== 'UAH')
            {
                if (obj.cc === firstСurrency) { rateArr[0] = obj.rate; }
                else if (obj.cc === secondСurrency) { rateArr[1] = obj.rate; }
            }
        }
        
        if (secondСurrency !== 'UAH' && firstСurrency !== 'UAH')
        {
        let converted = (rateArr[0] / rateArr[1]).toFixed(3);
        quantity = (quantity * converted).toFixed(3);
        }
        return quantity;
    }

    function Show() {
        let finalAmount = getAmount();
        if (regular !== true)
        {
        quantity = 'Ошибка';
        secondСurrency = 'Ошибка';
        setAmount(quantity);
        setName(secondСurrency);
        } 
        else if (quantity === 'NaN')
        {
        alert('Проверьте правильность введения валюты')
        }
        else 
        {
        setAmount(quantity);
        setName(secondСurrency);
        } 
    }
    
    return (
        <div className='convert'>
            <input
                type="text"
                value={value}
                placeholder='Введите валюту'
                onChange={event => setValue(event.target.value)}
            />
            <p className='convert_items_p' >Сумма, которую вы ввели: {amount}  { name} </p>
            <button  className='convert_items' onClick={Show}>Конвертировать валюту</button>
        </div>
    );
};

export default Converter;