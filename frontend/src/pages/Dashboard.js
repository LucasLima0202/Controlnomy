import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import Navbarui from "../components/Navbar";
import animationData from "../assets/lotties/welcome.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importando o estilo para o DatePicker
import BoxAtalhos from "../components/BoxHotkey";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faMoneyBill, faMoneyBillWave, faPlus, faReceipt, faSeedling } from "@fortawesome/free-solid-svg-icons";
import Chartone from "../components/charts/chart_one/chartone";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts";
import ListLimit from "../components/comptransactions/ListLimit";
import { Link } from "react-router-dom";
// import { Link } from 'react-scroll';
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
const Button = styled.button `
  outline: none;
  border: none;
  height: 55px;
  background: #282B2F;
  color: #fff;
  font-size: 15px;
  margin-top:4%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  font-weight:600;
  padding-left:5%;
  padding-right:5%;
  cursor: pointer;
  transition: 0.5s;
  transition-property: border-left, border-right, box-shadow;

  &:hover {
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }
  @media (max-width: 568px) {
  font-size:0.8rem;
  width:100%;
  }
`;
const Row = styled.div `
display:flex;
align-items:stretch;
align-self:stretch;
flex-flow:column nowrap;`;
const ArrowButton = styled.button `
background: none;
border: none;
cursor: pointer;
font-size: 1.5rem;
color: #768598;
`;
const ContainerRow = styled.div `
display: flex;
flex-flow: row;
`;
const BodyGroup = styled.div `
  width: 100%;
  margin:0;
  box-sizing: border-box;
  background-color: #F5F5F5;
  padding-top: 20px; /* Espaço reservado para a Navbar */
  min-height: 100vh; /* Garante que o conteúdo ocupe toda a altura da tela */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #6b8095;
`;
const WholeSite = styled.div `
  width: 100%;
  margin:0;
  box-sizing: border-box;
  background-color: #ECF0F2;
  padding-top: 80px; /* Espaço reservado para a Navbar */
  min-height: 100vh; /* Garante que o conteúdo ocupe toda a altura da tela */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #343A40;
`;
const ContentIl = styled.div `
  font-size: 1.2rem;
  text-align: left;
  color: #4b4b4b;
  line-height:30px;
  margin-top:5%;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
const Title = styled.h1 `
  margin-top:4%;
  font-size: 1.5rem;
  color:#343A40;
  font-weight:600;
  margin-bottom: 20px;
`;
const ButtonBig = styled.button `
  outline: none;
  border: none;
  font-weight: 600;
  width: 100%;
  height: 10.5rem;
  background: ${({ bgcolor }) => bgcolor || '#282B2F'};  
  color: ${({ color }) => color || '#fff'};  
  font-size: ${({ fontsize }) => fontsize || '16px'}; 
  margin-bottom: 5%;
  margin-top: 5%;
  letter-spacing: 0.5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all ease-in-out 0.5s;
  padding-left: 5%;
  padding-right: 5%;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 100px rgba(131, 131, 131, 0.767);
  }

  &:focus {
    outline: none;
  }
`;
const GroupWelcome = styled.div `
width:80%;
display:flex;
margin:4%;
margin-top: 2%;
justify-content:center;
gap:7px;
align-items:center;
flex-direction:column;
background-color:#FFFFFF;
padding: 4%;
border-radius: 8px;
box-shadow:  rgba(201, 201, 201, 0.15) 0px 4px 16px, rgba(201, 201, 201, 0.15) 0px 8px 32px;
`;
const GroupLine = styled.div `
width:90%;
border: solid #F1F1F1 0.8px;
display:flex;
justify-content:center;
gap:7px;
align-content:center;
align-items:center;
flex-direction:column;
background-color:#FFFFFF;
padding: 4%;
border-radius: 8px;
`;
const Elipse = styled.div `
  background: #ffdd7f65;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100px; /* Aumentado para acomodar o Lottie */
  height: 100px; /* Deve ser igual à largura para manter o formato */
`;
const Strecht = styled.div `
display:flex;
width:100%;
align-items: stretch;
`;
const TitleSmall = styled.h1 `
  font-size: 1.5rem;
  text-align: left;
  color: #343A40;
  font-weight: 600;
  margin-bottom: 2%;
  margin-top:5%;
 padding-right:10%;
  @media (max-width: 768px) {
    font-size: 1rem;
  }`;
const RowCustom = styled.div `
display:flex;
width:100%;
gap:20px;
justify-content:space-evenly;
align-items:stretch;
flex-flow: row nowrap;
`;
const RowLeft = styled.div `
display:flex;
width:100%;
margin-top:3%;
margin-bottom:3%;
justify-content:flex-start;
align-items:stretch;
flex-flow: row nowrap;
`;
const RowGroup = styled.div `
display:flex;
width:100%;
margin-top:5%;
margin-bottom:5%;
justify-content:space-between;
align-items:stretch;
flex-flow: row nowrap;
`;
const Diviser = styled.div `
display: flex;
align-items:flex-start;
justify-content:center;
width:100%;
`;
const DateMin = styled.span `
font-size: 0.89rem;
padding-top:1%;
width: 100%;
text-transform:capitalize;
text-align: center;
margin-bottom: 5px;
color:#718EBF;
`;
const Diveser = styled.div `
display: flex;
align-items:stretch;
justify-content:space-between;
font-weight:800;
margin-top:-39px;
`;
const ColumnCustom = styled.div `
display:flex;
flex-flow: column nowrap;
width:100%;
span{
padding-left:10px;
}
`;
const ColumButton = styled.div `
display:flex;
flex-flow: column nowrap;
justify-content:stretch;
align-self:stretch;
align-items:stretch;
gap: 20px !important;
width:100%;
`;
const CollumTypeIcon = styled.div `
display:flex;
flex-flow: column nowrap;

;`;
const Mp = styled.span `
color:#718EBF;
font-family: "Inter", serif;
`;
const MpMinus = styled.span `
color:#b53636;
font-size: 14px;
padding:0 !important;
margin-top:6%;  
font-family: "Inter", serif;
text-align:center;

`;
const MpGain = styled.span `
color:#236a18;
padding:0 !important;
margin-top:6%;  
font-size: 14px;
font-family: "Inter", serif;
text-align:center;
`;
const Sp = styled.span `
color:#718EBF;
margin-left:20px;
margin-top:6%;
margin-bottom:6%;
font-family: "Inter", serif;

`;
const SpanColor = styled.span `
color:#333B69;
font-weight:500;
font-family: "Inter", serif;

`;
const SpanColorMinus = styled.span `
color:#333B69;
font-weight:500;
font-size: 13px;
width:100%;
margin-top:8%;
word-wrap:normal;
text-align:center;
padding:0 !important;
font-family: "Inter", serif;

`;
const SquareRet = styled.div `
background: #282B2F;
text-align:center;
padding:5% 0%;
border-radius:4px;
width:100%;
`;
const Squaretxt = styled.div `
color: #ffffff;
`;
const Cardarticle = styled.div `
display:flex;
flex-flow: row;
gap:10px;
justify-content:center;
align-items:center;
`;
const Articlecol = styled.div `
display:flex;
flex-flow: column;
justify-content:center;
align-items:center;
`;
const IconGroup = styled.div `
height:60px !important;
width:60px  !important;
background-color: #282B2F;
display:flex;
align-items:center;
justify-content: center;
border-radius: 4px;
transition: ease-in-out all 0.2s;
color:#FFFFFF;
`;
const Separator = styled.div `
background-color: #F1F1F1;
width:100%;
height:1.5px;
margin-top:4%;
margin-bottom:4%;
`;
const GroupDate = styled.div `
display:flex;
flex-flow:column;
align-items:center;
justify-content:center;
width:100%;
`;
const Dashboard = () => {
    const [releasedamnt, setReleasedamnt] = useState(null);
    const [currentamnt, setCurrentamnt] = useState(null);
    const [spenttotal, setSpendtotal] = useState(null);
    const [earntotal, setEarntotal] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const month = selectedDate.getMonth() + 1; // Mês atual (1-12)
    const year = selectedDate.getFullYear(); // Ano atual
    // variavels de grafico 
    const pastelColors = [
        "#99d98c", "#76c893", "#52b69a", "#34a0a4", "#168aad",
        "#1a759f", "#1e6091", "#184e77", "#0a9396", "#ee9b00",
        "#ca6702", "#bb3e03", "#ae2012", "#9b2226", "#6a040f"
    ];
    const getCategoryColor = (index) => pastelColors[index % pastelColors.length]; // Garante um loop nas cores
    const [weeklySpending, setWeeklySpending] = useState([]);
    const [categorySpending, setCategorySpending] = useState([]);
    const [moneyFlow, setMoneyFlow] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token"); // Pegando o token armazenado
        const headers = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        Promise.all([
            axios.get(`http://localhost:8081/api/currentamountbmonth/${year}/${month}`, headers),
            axios.get(`http://localhost:8081/api/spenttotalbmonth/${year}/${month}`, headers),
            axios.get(`http://localhost:8081/api/earntotalbmonth/${year}/${month}`, headers),
            axios.get(`http://localhost:8081/api/releasedamountbmonth/${year}/${month}`, headers),
            axios.get(`http://localhost:8081/api/chart_weekly_spending/${year}/${month}`, headers),
            axios.get(`http://localhost:8081/api/chart_category_spending/${year}`, headers),
            axios.get(`http://localhost:8081/api/chart_money_flow/${year}`, headers)
        ])
            .then(([response1, response2, response3, response4, weeklyResponse, categoryResponse, moneyFlowResponse]) => {
            setCurrentamnt(response1.data.saldo_atual);
            setSpendtotal(response2.data.total_gastos);
            setEarntotal(response3.data.total_ganho);
            setReleasedamnt(response4.data.saldo_liberado);
            setWeeklySpending(weeklyResponse.data);
            setCategorySpending(categoryResponse.data);
            setMoneyFlow(moneyFlowResponse.data);
        })
            .catch((error) => {
            console.error("Erro ao buscar dados do mês e dos gráficos:", error);
        });
    }, [selectedDate]);
    const uData = [earntotal];
    const pData = [spenttotal];
    const xLabels = [
        'Week 1',
        'Week 2',
        'Week 3',
        'Week 4',
    ];
    const handlePrevMonth = () => {
        const prevMonth = new Date(selectedDate);
        prevMonth.setMonth(prevMonth.getMonth() - 1); // Decrementa o mês
        setSelectedDate(prevMonth);
    };
    const handleNextMonth = () => {
        const nextMonth = new Date(selectedDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1); // Incrementa o mês
        setSelectedDate(nextMonth);
    };
    return (_jsxs(WholeSite, { children: [_jsx(Navbarui, {}), _jsxs(BodyGroup, { children: [_jsx(Title, { children: "Bem-vindo ao Dashboard" }), _jsx(GroupWelcome, { children: _jsxs(GroupLine, { children: [_jsxs(RowCustom, { children: [_jsx(GroupDate, { children: _jsx(Diviser, { children: _jsxs(DateMin, { children: [selectedDate.toLocaleString("pt-BR", { month: "long" }), " ", _jsxs(Diveser, { children: [_jsx(ArrowButton, { onClick: handlePrevMonth, children: _jsx(FontAwesomeIcon, { icon: faChevronLeft, fontSize: 20 }) }), _jsx(DatePicker, { selected: selectedDate, onChange: date => setSelectedDate(date), dateFormat: "MM/yyyy", showMonthYearPicker: true, customInput: _jsx(Button, {}) }), _jsx(ArrowButton, { onClick: handleNextMonth, children: _jsx(FontAwesomeIcon, { icon: faChevronRight, fontSize: 20 }) })] })] }) }) }), _jsxs(ColumnCustom, { children: [_jsx(SquareRet, { children: _jsx(Squaretxt, { children: "Saldo Liberado" }) }), _jsxs(Sp, { children: ["R$ ", releasedamnt] })] })] }), _jsx(RowLeft, { children: _jsxs(Cardarticle, { children: [_jsx(IconGroup, { children: _jsx(FontAwesomeIcon, { icon: faMoneyBill, fontSize: 21 }) }), _jsxs(CollumTypeIcon, { children: [_jsx(SpanColor, { children: "Saldo Atual" }), _jsxs(Mp, { children: ["R$ ", currentamnt] })] })] }) }), _jsx(Separator, {}), _jsxs(RowGroup, { children: [_jsxs(Articlecol, { children: [_jsx(IconGroup, { children: _jsx(FontAwesomeIcon, { icon: faReceipt, fontSize: 21 }) }), _jsxs(ColumnCustom, { children: [_jsxs(SpanColorMinus, { children: ["Total ", _jsx("br", {}), "Despesas"] }), _jsxs(MpMinus, { children: ["R$ ", spenttotal] })] })] }), _jsxs(Articlecol, { children: [_jsx(IconGroup, { children: _jsx(FontAwesomeIcon, { icon: faMoneyBillWave, fontSize: 21 }) }), _jsxs(ColumnCustom, { children: [_jsxs(SpanColorMinus, { children: ["Total ", _jsx("br", {}), "Ganhos"] }), _jsxs(MpGain, { children: ["R$ ", earntotal] })] })] }), _jsxs(Articlecol, { children: [_jsx(IconGroup, { children: _jsx(FontAwesomeIcon, { icon: faSeedling, fontSize: 21 }) }), _jsxs(ColumnCustom, { children: [_jsxs(SpanColorMinus, { children: ["Total ", _jsx("br", {}), "Invest"] }), _jsx(MpGain, {})] })] })] })] }) }), _jsx(Title, { children: "Atalhos" }), _jsx(BoxAtalhos, {}), _jsxs(Title, { children: ["Gastos Semanais (", selectedDate.toLocaleString("pt-BR", { month: "long" }), ")"] }), _jsx(Chartone, { children: _jsx(BarChart, { width: 400, height: 240, series: [
                                { data: weeklySpending.map(w => parseFloat(w.total_gastos)), label: "Gastos", color: "#B53535" },
                                { data: weeklySpending.map(w => parseFloat(w.total_ganhos)), label: "Ganhos", color: "#41805A" },
                            ], xAxis: [{ data: weeklySpending.map(w => `Semana ${w.week}`), scaleType: "band" }] }) }), _jsxs(Title, { children: ["Gastos por Categoria (", year, ")"] }), _jsx(Chartone, { children: _jsx(PieChart, { series: [{
                                    data: categorySpending.map((c, index) => ({
                                        id: c.categoria,
                                        value: parseFloat(c.total_gasto),
                                        label: c.categoria,
                                        color: getCategoryColor(index) // Define uma cor dinâmica para cada categoria
                                    })),
                                }], width: 400, height: 240 }) }), _jsxs(Title, { children: ["Fluxo de Dinheiro (", year, ")"] }), _jsx(Chartone, { children: _jsx(BarChart, { width: 400, height: 240, series: [
                                { data: moneyFlow.map(m => parseFloat(m.total_gastos)), label: "Gastos", color: "#B53535" },
                                { data: moneyFlow.map(m => parseFloat(m.total_ganhos)), label: "Ganhos", color: "#41805A" },
                            ], xAxis: [{ data: moneyFlow.map(m => `Mês ${m.mes}`), scaleType: "band" }] }) }), _jsx(Title, { children: "Ultimas Transa\u00E7\u00F5es" }), _jsx(ListLimit, {}), _jsx(Title, { children: "Registre suas Transa\u00E7\u00F5es" }), _jsx(Chartone, { children: _jsxs(ContainerRow, { children: [_jsxs(ColumnCustom, { children: [_jsx(TitleSmall, { children: "Gerencie suas Finan\u00E7as" }), _jsx(ContentIl, { children: "Acompanhe sua evolu\u00E7\u00E3o financeira no Dashboard" })] }), _jsx(ColumButton, { children: _jsx(Link, { to: "/transactions", children: _jsx(ButtonBig, { children: _jsx(FontAwesomeIcon, { icon: faPlus }) }) }) })] }) })] })] }));
};
export default Dashboard;
