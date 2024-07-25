import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import { BUTTON_SIZE } from '../../config/config';


const SideBarData = [
    {
        page: 'Página Principal',
        icon:  <AiIcons.AiFillDashboard size={BUTTON_SIZE} />,
        path: '/dashboard',
    },
    {
        page: "Segurança",
        icon: <AiIcons.AiFillSecurityScan size={BUTTON_SIZE}/>,
        sub_menu: [
            {
                page: 'Usuário',
                icon:  <FaIcons.FaUser size={BUTTON_SIZE} />,
                path: '/usuario/listar',
            },
            {
                page: 'Direito de Acesso',
                icon:  <FaIcons.FaTable size={BUTTON_SIZE} />,
                path: '/role/listar',
            },
        ]
    },
]

export default SideBarData

