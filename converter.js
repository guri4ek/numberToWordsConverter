let numberToWordsConverter = {

    convert(number) {
        this.finalWords = '';

        this._setDecimalNFloatParts(number);

        this._addMillions();
        this._addThousands();

        this._addHundreds(this.number);
        this._addSecondTen(this.number);
        this._addTens(this.number);
        this._addOnes(this.number);

        this._addCurrency();

        this._addCents();

        return this.finalWords.trim();
    },

    _setDecimalNFloatParts(number) {
        let stringNumber = this._convertToStringFormat(number);
        this.number = stringNumber.split('.')[0];

        if (stringNumber.split('.')[1] != undefined) {
            this.floatPart = stringNumber.split('.')[1];

            if (this.floatPart.length == 1) {
                this.floatPart = String(this.floatPart * 10);
            }
        } else {
            this.floatPart = '0';
        }
    },

    _convertToStringFormat(number) {
        return String(Math.round(parseFloat(String(number).replace(/,/g, '.')) * 100 ) / 100);
    },

    _addCents()
    {
        /*
        this._addSecondTen(this.floatPart);
        this._addTens(this.floatPart);
        this._addOnes(this.floatPart);
        */
        this._addCentsFloat();
        this._addCentsnWord(this.floatPart);
    },

    _addCentsFloat()
    {
        this.finalWords += ' ' + this.floatPart;
    },

    _addMillions()
    {
        if(this.number < 1000000) {
            return ;
        }

        const getMillions = (n) => {
          return Math.floor(n/1000000) % 1000000;
        }

        let millions = this._convertToStringFormat(getMillions(this.number));

        this._addHundreds(millions);
        this._addSecondTen(millions);
        this._addTens(millions);
        this._addOnes(millions);
        this._addMillionWord(millions);
    },

    _addThousands()
    {
        if(this.number < 1000) {
            return ;
        }

        const getThousands = (n) => {
          return Math.floor(n/1000) % 1000;
        }

        let thousands = this._convertToStringFormat(getThousands(this.number));

        this._addHundreds(thousands);
        this._addSecondTen(thousands);
        this._addTens(thousands);
        this._addOnes(thousands);
        this._addThousandWord(thousands);
    },

    _addHundreds(number) {
        let words = '';

        if(number >= 100) {
            words += this.hundreds[number[number.length-3]] + ' ';
        }

        this.finalWords += ' ' + words;
    },

    _addSecondTen(number) {
        let words = '';

        if (number >= 10 && number < 20) {
            words = this.secondTen[number[number.length-1]];
        }

        this.finalWords += ' ' + words;
    },

    _addTens(number) {
        let words = '';

        if(number >= 20) {
            words += this.tens[number[number.length-2]];
        }

        this.finalWords += ' ' + words;
    },

    _addOnes(number) {
        if (number >= 10 && number < 20) {
            return ;
        }

        let words = this.ones[number[number.length-1]];

        this.finalWords += ' ' + words;
    },

    _addCurrency() {
        let changeEnding = this.number < 9 || this.number >= 20;


        if (this.number[this.number.length-1] == '1' && changeEnding) {
            this.finalWords += ' гривня';
        } else if (this.number == '0') {
            this.finalWords += 'нуль гривень';
        } else if (
            (this.number[this.number.length-1] == '2' ||
            this.number[this.number.length-1] == '3' ||
            this.number[this.number.length-1] == '4') &&
            changeEnding
        ) {
            this.finalWords += ' гривні';
        } else {
            this.finalWords += ' гривень';
        }
    },

    _addThousandWord(thousands) {
        let changeEnding = thousands < 9 || thousands >= 20;

        if (thousands[thousands.length-1] == '1' && changeEnding) {
            this.finalWords += ' тисяча';
        } else if (
            (thousands[thousands.length-1] == '2' ||
            thousands[thousands.length-1] == '3' ||
            thousands[thousands.length-1] == '4') &&
            changeEnding
        ) {
            this.finalWords += ' тисячі';
        } else {
            this.finalWords += ' тисяч';
        }
    },

    _addMillionWord(millions) {
        let changeEnding = millions < 9 || millions >= 20;

        if (millions[millions.length-1] == '1' && changeEnding) {
            this.finalWords += ' мільйон';
        } else if (
            (millions[millions.length-1] == '2' ||
            millions[millions.length-1] == '3' ||
            millions[millions.length-1] == '4') &&
            changeEnding
        ) {
            this.finalWords += ' мільйони';
        } else {
            this.finalWords += ' мільйонів';
        }
    },

    _addCentsnWord(cents) {
        let changeEnding = cents < 9 || cents >= 20;

        if (cents[cents.length-1] == '1' && changeEnding) {
            this.finalWords += ' копійка';
        } else if (
            (cents[cents.length-1] == '2' ||
            cents[cents.length-1] == '3' ||
            cents[cents.length-1] == '4') &&
            changeEnding
        ) {
            this.finalWords += ' копійки';
        } else {
            this.finalWords += ' копійок';
        }
    },

    finalWords : '',

    number : '0',
    floatPart : '0',

    hundreds : ["", "сто", "двісті", "триста", "чотириста", "п'ятсот", "шістсот", "сімсот", "вісімсот", "дев'ятсот"],

    tens : ["", "", "двадцять", "тридцять", "сорок", "п'ятдесят ", "шістдесят", "сімдесят", "дев'яносто", "дев'яносто"],

    secondTen : ["десять", "одинадцять", "дванадцять", "тринадцять", "чотирнадцять", "п'ятнадцять", "шістнадцять", "сімнадцять", "вісімнадцять", "дев'ятнадцять"],

    ones : ["", "одна", "дві", "три", "чотири", "п'ять", "шість", "сімь", "вісім", "дев'ять"],
}
