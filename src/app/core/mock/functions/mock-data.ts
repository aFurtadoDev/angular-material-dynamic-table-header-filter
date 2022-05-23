import { BusinessData } from '../interfaces/business-data';

export function createBusinessData(): BusinessData[] {
  return [
    {
      id: 161,
      num_ro: '0000001',
      identificacao: 'Identificação do projeto / Obra 01',
      nome_finalidade: 'Indústria',
      id_estado: 'SP',
      area: 8162.0,
      nome_tipo: '1ª Obra',
    },
    {
      id: 162,
      num_ro: '0000002',
      identificacao: 'Identificação do projeto / Obra 02',
      nome_finalidade: 'Shopping center',
      id_estado: 'SP',
      area: 7776.0,
      nome_tipo: '1ª Obra',
    },
    {
      id: 165,
      num_ro: '0000003',
      identificacao: 'Identificação do projeto / Obra 03',
      nome_finalidade: 'Indústria',
      id_estado: 'AM',
      area: 8976.0,
      nome_tipo: '1ª Obra',
    },
  ];
}
