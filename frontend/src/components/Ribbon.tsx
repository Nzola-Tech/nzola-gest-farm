import { useState } from 'react';
import { ThemeSwitch } from './theme-switch';

const tabs = [
  { name: 'INICIO', content: ['Dados da Empresa', 'Minha Agenda', 'Alterar Minha Senha'] },
  { name: 'COMERCIAL', content: ['Configuração Jabakule (SMS)'] },
  { name: 'ARMAZEM', content: ['Cópia de Segurança', 'Importação de Dados Via Saft'] },
  { name: 'TESOURARIA', content: ['Utilizadores', 'Perfil de Utilizadores'] },
  { name: 'CONTABILIDADE', content: ['QUIANNI Suporte (QS)', 'Denuncie'] },
  { name: 'UTILITÁRIOS E CONFIGURAÇÕES', content: ['Gestão de Idiomas', 'Ajuda', 'Configurações'] }
];

export default function Ribbon() {
  const [activeTab, setActiveTab] = useState("INICIO");

  return (
    <div className="">
      {/* Tabs */}
      <div className="flex space-x-2 justify-between px-2 mt-2">
        <div>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 font-semibold ${
              activeTab === tab.name ? 'bg-blue-500 text-white rounded-t-md shadow' : 'text-black'
            } dark:text-white`}
          >
            {tab.name}
          </button>
        ))}
        </div>
        <ThemeSwitch />
      </div>

      {/* Content */}
      <div className="bg-white p-4 grid grid-cols-3 gap-4 border-t border-blue-400">
        {tabs
          .find((tab) => tab.name === activeTab)
          ?.content.map((item) => (
            <div key={item} className="flex flex-col items-center border p-2 rounded bg-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {/* Aqui você pode colocar ícones */}
                🛠
              </div>
              <span className="mt-2 text-sm text-center">{item}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
