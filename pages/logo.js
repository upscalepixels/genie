import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/navbar';
const items = [
  { label: 'Standard', value: 'graphic t-shirt illustration design of', params: 'in a clean vector style on a solid background --s 1000 --no mockup' },
  { label: 'Colorful', value: 'rainbow color graphic t-shirt illustration design of', params: 'in a clean vector style on a solid background --s 1000 --no mockup' },
  { label: 'Vintage', value: 'monochromatic vintage graphic t-shirt vector design of', params: 'in a simple single color style on a solid background --s 1000 --no mockup' },
  { label: 'Cartoon', value: 'retro illustration of', params: 'in a cartoon style on a solid background --s 1000 --no mockup' },
  { label: 'Kawaii', value: 'cute chibi kawaii style of', params: 'on a solid background --s 1000 --no mockup' },
  { label: 'Anime', value: 'anime style illustration of', params: 'on a solid background --s 1000 --no mockup' },
  { label: 'Manga', value: 'manga style japanese anime art for', params: 'enclosed in a comic book style panel --ar 3:2 --s 1000 --no mockup text words girls people' },
  { label: 'Comic', value: 'graphic novel illustration for', params: 'enclosed in a comic book art style panel --ar 4:5 --s 1000 --no mockup text words' },
  { label: 'Heart', value: 'graphic t-shirt vector in the shape of a heart made up of elements related to', params: 'on a solid background --s 1000 --no mockup' },
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
  };4

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
