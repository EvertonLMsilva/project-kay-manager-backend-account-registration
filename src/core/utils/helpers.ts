export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
    return false;
  }
  let sum = 0;
  for (let i = 0; i < 9; ++i) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.charAt(9))) {
    return false;
  }
  sum = 0;
  for (let i = 0; i < 10; ++i) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
};


export const validarEAN13 = (barcode: string) => {
  // Verificar se o código fornecido tem 13 dígitos
  if (barcode.length !== 13 || !/^\d{13}$/.test(barcode)) {
    return {
      message: "Invalid: Barcode must be 13 digits long.",
      done: false
    };
  }

  // Calcular dígito de verificação
  var soma = 0;
  for (var i = 0; i < 12; i++) {
    soma += parseInt(barcode[i]) * (i % 2 === 0 ? 1 : 3);
  }
  var digitoVerificadorCalculado = (10 - (soma % 10)) % 10;
  var digitoVerificador = parseInt(barcode[12]);

  // Verificar se o dígito de verificação fornecido é igual ao dígito calculado
  if (digitoVerificador === digitoVerificadorCalculado) {
    return {
      message: "",
      done: true
    };
  } else {
    return {
      message: "Invalid: the check digit does not match.",
      done: false
    };
  }
}