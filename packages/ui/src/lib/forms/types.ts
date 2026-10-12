/** Address shape returned by a CEP lookup (ViaCEP field names). */
export interface CepAddress {
	logradouro: string;
	bairro: string;
	localidade: string;
	uf: string;
}
