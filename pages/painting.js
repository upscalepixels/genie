import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/navbar';
const items = [
  { label: 'Oil Painting', value: 'oil painting::1', params: '--ar 11:14 --s 1000 --no mockup frame' },
  { label: 'Acrylic Painting', value: 'acrylic painting::1', params: '--ar 11:14 --s 1000 --no mockup frame' },
  { label: 'Digial Painting', value: 'digital painting::1', params: '--ar 11:14 --s 1000 --no mockup frame' },
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedItemsString, setSelectedItemsString] = useState('');
  const inputRef = useRef(null);

  const handleItemSelect = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const startMessage = '/imagine prompt:';
  const selectedItemString = selectedItem ? `${selectedItem} ${inputValue} ` : '';
  const selectedItemValue = items.find((item) => item.value === selectedItem);
  const newSelectedItemsString = startMessage + selectedItemString + selectedItemValue?.params;

  useEffect(() => {
    setSelectedItemsString(newSelectedItemsString);
    handleCopyClick();
  }, [selectedItem, inputValue]);

  useEffect(() => {
    handleCopyClick();
  }, [selectedItemsString]);

  const handleCopyClick = () => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = selectedItemsString;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    tempTextArea.remove();
    if (inputRef.current) {
      inputRef.current.focus(); // refocus on input after copy
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus on input after initial render
    }
  }, []);

  return (
    <div className="main">
      <Navbar />
      <div className="float-container">
        <div className="container">
          <div className="input">
              <input type="text" placeholder="Describe Subject" value={inputValue} onChange={handleInputChange} ref={inputRef} />
          </div>
        </div>        
      </div>

      <div className="choice-container container">
        <div className="type">
          {items.map((item) => (
            <div key={item.value} className={selectedItem === item.value ? 'radio checked' : 'radio'}>
              <label>
                <input
                  type="radio"
                  value={item.value}
                  checked={selectedItem === item.value}
                  onChange={handleItemSelect}
                />
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
       
    </div>
  );
}
