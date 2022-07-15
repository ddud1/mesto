export default class FormValidator {
  constructor(config, form ){
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.popupInput));
    this._buttonElement = this._form.querySelector(`.${this._form.id}-button`);
    this._formList = Array.from(document.querySelectorAll(config.popupForm));
  }

  _isValid(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
      this._buttonState();
    } else {
      this._hideInputError(inputElement);
      this._buttonState();
    }
  } 

  _buttonState(){
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.submitInactiveClass);
      this._buttonElement.disabled=true;
    } else {
      this._buttonElement.classList.remove(this._config.submitInactiveClass);
      this._buttonElement.disabled=false;
    } 
  }

  _setEventListeners(){
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._buttonState();
      });
    })
  }

  enableValidation(){
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _showInputError(inputElement){
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.errorBorder);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorActiveClass);
  }

   _hideInputError(inputElement){
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.errorBorder);
    errorElement.classList.remove(this._config.errorActiveClass);
    errorElement.textContent = '';
   } 

    _hasInvalidInput(){
      return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
   }

    resetError(){
      this._inputList.forEach(inputElement => this._hideInputError(inputElement));
      this._buttonState();
    }
}
