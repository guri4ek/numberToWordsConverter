let numberToWordsConverter = {

    convert(number) {
        this.finalWords = '';

        this.number = this._convertToStringFormat(number);

        this._addThousands();
        this._addHundreds(this.number);
        this._addSecondTen(this.number);
        this._addTens(this.number);
        this._addOnes(this.number);
        this._addCurrency();

        return this.finalWords.trim();
    },

    _convertToStringFormat(number) {
        return String(number);
    },

    _addMillions()
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

        if (number >= 10 && this.number < 20) {
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

    finalWords : '',

    number : '',

    hundreds : ["", "сто", "двісті", "триста", "чотириста", "п'ятсот", "шістсот", "сімсот", "вісімсот", "дев'ятсот"],

    tens : ["", "", "двадцять", "тридцять", "сорок", "п'ятдесят ", "шістдесят", "сімдесят", "дев'яносто", "дев'яносто"],

    secondTen : ["десять", "одинадцять", "дванадцять", "тринадцять", "чотирнадцять", "п'ятнадцять", "шістнадцять", "сімнадцять", "вісімнадцять", "дев'ятнадцять"],

    ones : ["", "одна", "дві", "три", "чотири", "п'ять", "шість", "сімь", "вісім", "дев'ять"],
}
