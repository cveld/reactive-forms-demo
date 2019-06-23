import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'inputCurrency'
})
export class InputCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const currencyPattern = /([0-9,.]+)/g;
    const currencyString = (value as string);
    const isCurrency = currencyPattern.test(currencyString);

    if (isCurrency) {
      // split into euros(0) and cents(1)
      const substrings = currencyString.split(',');

      const eurosArr = substrings[0].split('.');

      let euros = '';

      eurosArr.forEach(duizendtal => {
        euros += duizendtal;
      });

      let newEuros = '';

      while (euros.length > 1 && euros[0] === '0') {
        euros = euros.substr(1);
      }

      if (euros.length > 3) {
        for (let i = euros.length; i > 3; i -= 3) {
          newEuros = '.' + euros.slice(i - 3, i) + newEuros;

        }

        newEuros = euros.substr(0, (euros.length % 3 === 0 ? 3 : euros.length % 3)) + newEuros;
      } else {
        newEuros = euros;
      }

      if (!newEuros) {
        newEuros = '0';
      }

      const cents = !!substrings[1] ? (substrings[1] + '00').substr(0, 2) : '00';
      // console.log(cents || 'no cents');

      const newCurrencyString = cents ? newEuros + ',' + cents : newEuros;
      // console.log(newCurrencyString);

      return newCurrencyString;
    }
    return value;
  }

}

export const inputCurrency = new InputCurrencyPipe();
