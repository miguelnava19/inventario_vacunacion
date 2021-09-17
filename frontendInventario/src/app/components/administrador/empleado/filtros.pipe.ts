import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log("arg ", args)

    var fEsVacunacion = args[0];
    var fTipoVacuna = args[1];
    var fDosis = args[2];

    const result = [];
    if (fEsVacunacion === '' && fTipoVacuna === '' && (!fDosis || fDosis === ''))
      return value;

    for (const res of value) {
      var val1 = fEsVacunacion === '' ? true : this.valida(fEsVacunacion, res.estadoVacunacion)
      var val2 = fTipoVacuna === '' ? true : this.valida(fTipoVacuna, res.tipoVacuna)
      var val3 = (!fDosis || fDosis === '') ? true : this.valida(fDosis, res.numeroDosis)
      if (val1 && val2 && val3)
        result.push(res)
    }
    return result;
  }

  valida(valueFilter, value) {
    return (value && valueFilter !== '' && valueFilter.toString().toLowerCase() === value.toString().toLowerCase())
  }

}
