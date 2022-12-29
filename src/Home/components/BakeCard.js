/* eslint-disable react-hooks/exhaustive-deps */
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import treasuryImg from "../../assets/treasury.png"
import profitImg from "../../assets/profit.png"
import Connect from "../components/Connect";

import PriceInput from "../../components/PriceInput";
import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";

const CardWrapper = styled(Card)({
  background: "rgb(251 241 225)",
  marginBottom: 24,
});

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

let timeout = null;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BakeCard() {
  const { contract, wrongNetwork, getBnbBalance, fromWei, toWei, web3 } =
    useContractContext();
  const { address, chainId } = useAuthContext();
  const [contractBNB, setContractBNB] = useState(0);
  const [walletBalance, setWalletBalance] = useState({
    bnb: 0,
    beans: 0,
    rewards: 0,
	tvl: 0,
  });
  const [bakeBNB, setBakeBNB] = useState(0);
  const [calculatedBeans, setCalculatedBeans] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const fetchContractBNBBalance = () => {
    if (!web3 || wrongNetwork) {
      setContractBNB(0);
      return;
    }
    getBnbBalance(config.contractAddress).then((amount) => {
      setContractBNB(fromWei(amount));
    });
  };

  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
		tvl: 0,
      });
      return;
    }

    try {
      const [bnbAmount, beansAmount, rewardsAmount,caTVL] = await Promise.all([
        getBnbBalance(address),
        contract.methods
          .getMyMiners(address)
          .call()
          .catch((err) => {
            console.error("myminers", err);
            return 0;
          }),
        contract.methods
          .beanRewards(address)
          .call()
          .catch((err) => {
            console.error("beanrewards", err);
            return 0;
          }),
		contract.methods
          .getBalance()
          .call()
          .catch((err) => {
            console.error("beanrewards", err);
            return 0;
          }),
      ]);
      setWalletBalance({
        bnb: fromWei(`${bnbAmount}`),
        beans: beansAmount,
        rewards: fromWei(`${rewardsAmount}`),
		tvl: fromWei(`${caTVL}`),
      });
    } catch (err) {
      console.error(err);
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
		tvl: 0,
      });
    }
  };

  useEffect(() => {
    fetchContractBNBBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address, web3, chainId]);

  const onUpdateBakeBNB = (value) => {
    setBakeBNB(value);
  };

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      : "0x0000000000000000000000000000000000000000";
    return ref;
  };

  const bake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.buyEggs(ref).send({
        from: address,
        value: toWei(`${bakeBNB}`),
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  const reBake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.hatchEggs(ref).send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await contract.methods.sellEggs().send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };



  return (
    <div>
  <meta charSet="UTF-8" />
  <title>Andromeda</title>
  <meta name="robots" content="noindex" />
  <link rel="shortcut icon" type="image/x-icon" href="https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico" />
  <link rel="mask-icon" href="https://cpwebassets.codepen.io/assets/favicon/logo-pin-8f3771b1072e3c38bd662872f6b673a722f4b3ca2421637d5596661b4e2132cc.svg" color="#111" />
  <link rel="canonical" href="https://codepen.io/erkanerdil016/pen/LYdOpKj" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style className="INLINE_PEN_STYLESHEET_ID" dangerouslySetInnerHTML={{__html: "\n    body {\n  margin: 0;\n   background-color: #1F1D2B;\n}\n\n.hidden {\n  display: none;\n}\n\n.landingpage {\n  margin: 0 auto;\n  padding: 0 80px;\n  position: relative;\n  max-width: 1100px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #1F1D2B;\n}\n.landingpage::before {\n  content: \"\";\n  position: absolute;\n  width: 123px;\n  height: 123px;\n  left: 60%;\n  top: 138px;\n  filter: blur(90px);\n  background-color: #FB37FF;\n}\n.landingpage::after {\n  content: \"\";\n  position: absolute;\n  width: 123px;\n  height: 123px;\n  left: 80%;\n  top: 550px;\n  background-color: #18B2DE;\n  filter: blur(80px);\n}\n.landingpage .navbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 0;\n  width: 100%;\n}\n.landingpage .box {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 80px;\n}\n.landingpage .auction {\n  margin-top: 100px;\n}\n.landingpage .discover {\n  display: flex;\n  flex-direction: column;\n}\n.landingpage .footer {\n  margin: 50px 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.landingpage .footer2 {\n  display: flex;\n  justify-content: space-between;\n  padding-bottom: 30px;\n  border-top: 1px solid #F2F2F2;\n}\n\n.navbar .hamburgerlogowrap {\n  display: flex;\n  align-items: center;\n}\n.navbar .hamburger {\n  display: none;\n  color: #D7D7D7;\n  background-color: #1F1D2B;\n  border: none;\n  margin-right: 10px;\n}\n.createbtn {\n  cursor: pointer;\n  background-color: transparent;\n  border: none;\n  width: 260px;\n  height: 45px;\n  color: #BCBCBC;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 500;\n  font-size: 25px;\n}\n.createbtn.selectedbtn {\n  border: 1px solid #D7D7D7;\n  border-radius: 10px;\n}\n.navbar .navlogo {\n  height: 100%;\n  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 700;\n  font-size: 32px;\n}\n.navbar .navlink {\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 500;\n  font-size: 12px;\n  color: #BCBCBC;\n}\n.navbar .navlink.selectedlink {\n  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  border-bottom: 1.5px solid #9B51E0;\n}\n.navbar .navlink:not(:last-child) {\n  margin-right: 32px;\n}\n\n .infobox {\n  animation-name: leftslide;\n  animation-duration: 0.8s;\n  max-width: 55%;\n  overflow: hidden;\n}\n .infobox-boldtext {\n  margin: 0;\n  font-family: Poppins;\n  color: #FFFFFF;\n  font-size: 5vh;\n  font-weight: 600;\n  line-height: 5vh;\n  letter-spacing: -2px;\n  text-align: left;\n}\n .infobox-slimtext {\n  margin: 24px 0;\n  font-family: Poppins;\n  color: #FFFFFF;\n  font-size: 2vh;\n  font-weight: 400;\n  line-height: 2vh;\n  letter-spacing: 0.5px;\n  text-align: left;\n}\n .infobox-btnwrapper {\n  display: flex\n} \n.infobox-btnwrapper-second {\n  display: grid;\n  grid-template-columns: auto auto auto auto;\n  grid-row-gap: 20px;\n  grid-column-gap: 20px;\n  justify-content: space-between;\n}\n .infobox-explorebtn {\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #1F1D2B;\n  padding: 22px 38px;\n  border-radius: 16px;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 600;\n  font-size: 20px;\n  letter-spacing: -1px;\n  color: #FFFFFF;\n}\n .infobox-createbtn {\n  cursor: pointer;\n  margin-left: 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: transparent;\n  padding: 22px 38px;\n  border: 1px solid #D7D7D7;\n  border-radius: 16px;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 600;\n  font-size: 1.5vh;\n  letter-spacing: -1px;\n  color: #FFFFFF;\n}\n .infobox .selected {\n  border: none;\n  background: linear-gradient(103.91deg, #9B51E0 21.01%, rgba(48, 129, 237, 0.8) 100%);\n}\n.box .display {\n  animation-name: rightslide;\n  animation-duration: 0.8s;\n  padding: 14px;\n  border: 1px solid;\n  background: linear-gradient(169.44deg, rgba(58, 129, 191, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%);\n  border-radius: 35px;\n  max-height: 450px;\n  max-width: 50%;\n  overflow: hidden;\n}\n.box .display-nft {\n  object-fit: cover;\n  flex-shrink: 0;\n  width: 300px;\n  height: 300px;\n  border-radius: 20px;\n}\n.box .display .infowrapper {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 10px;\n}\n.box .display .info {\n  display: flex;\n  align-items: center;\n  font-family: \"Poppins\";\n  font-style: normal;\n  color: #FFFFFF;\n  font-weight: 600;\n  font-size: 12px;\n}\n.box .display .info p {\n  margin: 0;\n}\n.box .display .info-img {\n  object-fit: cover;\n  flex-shrink: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  margin-right: 10px;\n}\n.box .display .info2 {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  font-family: \"Poppins\";\n  color: #FFFFFF;\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n}\n.box .display .info2 p {\n  margin: 0;\n}\n.box .display .info2 .iconwrapper {\n  display: flex;\n  align-items: center;\n}\n.box .display .info2 .iconwrapper svg {\n  margin-right: 5px;\n}\n\n.auction .title {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  margin-bottom: 50px;\n}\n.auction .title .titlebold {\n  margin: 0;\n  font-family: \"Poppins\";\n  font-style: normal;\n  color: #FFFFFF;\n  font-weight: 500;\n  font-size: 48px;\n  line-height: 72px;\n}\n.auction .title .titleslim {\n  margin: 0;\n  font-family: \"Poppins\";\n  font-style: normal;\n  color: #D7D7D7;\n  font-weight: 600;\n  font-size: 18px;\n  line-height: 36px;\n  letter-spacing: -1px;\n}\n.auction .nft {\n  display: grid;\n  grid-template-columns: auto auto auto auto;\n  grid-row-gap: 20px;\n  grid-column-gap: 20px;\n  justify-content: space-between;\n}\n\n.started {\n  margin-top: 100px;\n  display: flex;\n  flex-direction: column;\nalign-items: center;\n}\n.started-boldtext {\n  margin: 0;\n  align-self: center;\n  font-family: \"Poppins\";\n  font-style: normal;\n  color: #FFFFFF;\n  font-weight: 500;\n  font-size: 4vh;\n  line-height: 4vh;\n}\n.started-slimtext {\n  margin: 10;\n  align-self: center;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 400;\n  font-size: 2vh;\n  line-height: 2vh;\n  letter-spacing: 0.5px;\n  color: #E2E2E2;\n}\n.started-items {\n  padding: 60px 80px;\n  position: relative;\n  display: grid;\n  grid-template-columns: auto auto auto auto;\n  grid-column-gap: 100px;\n  grid-row-gap: 20px;\n  justify-content: space-between;\n}\n.miner-box {\n  padding: 60px 80px;\n  position: relative;\n  grid-template-columns: auto auto auto auto;\n  grid-column-gap: 100px;\n  grid-row-gap: 20px;\n  justify-content: space-between;\n}\n.started-items:before {\n  content: \"\";\n  position: absolute;\n  width: 80%;\n  height: 100px;\n  top: 80px;\n  filter: blur(80px);\n  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);\n}\n.miner-box:before {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100px;\n  top: 0px;\n  filter: blur(200px);\n  background: linear-gradient(93.51deg, #9B51E0 32.84%, #3081ED 95.18%);\n}\n\n\n.started-items .itemwrapper p {\n  width: 100px;\n  margin: 0;\n  margin-top: 10px;\n  text-align: center;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 400;\n  font-size: 12px;\n  color: #FFFFFF;\n}\n.started-items-item {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 150px;\n  height: 150px;\n  border-radius: 18px;\n  background-color: red;\n  background: rgba(255, 255, 255, 0.095);\n  box-shadow: inset 2.01px -2.01px 20px rgba(214, 214, 214, 0.17), inset -3.01333px 3.01333px 3.01333px rgba(255, 255, 255, 0.39);\n  backdrop-filter: blur(74.4293px);\n}\n\n.discover-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.discover-title p {\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 500;\n  font-size: 36px;\n  letter-spacing: -1px;\n  color: #FFFFFF;\n}\n.discover-items {\n  display: grid;\n  grid-template-columns: auto auto auto auto;\n  grid-row-gap: 20px;\n  grid-column-gap: 20px;\n  justify-content: space-between;\n}\n.discover-loadbtn {\n  cursor: pointer;\n  margin-top: 20px;\n  align-self: center;\n  width: 161px;\n  height: 40px;\n  border: 1px solid #D7D7D7;\n  border-radius: 10px;\n  background-color: transparent;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 500;\n  font-size: 12px;\n  letter-spacing: 1.5px;\n  color: #BCBCBC;\n}\n\n.footer-main {\n  max-width: 40%;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 500;\n  font-size: 30px;\n  line-height: 40px;\n  color: #FFFFFF;\n}\n.footer-navigate {\n  display: flex;\n}\n.footer-navigate .nav {\n  margin-left: 60px;\n}\n.footer-navigate .nav h5 {\n  margin: 0;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 400;\n  font-size: 20px;\n  line-height: 30px;\n  color: #FFFFFF;\n}\n.footer-navigate .nav p {\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 400;\n  font-size: 12px;\n  line-height: 18px;\n  letter-spacing: 0.03em;\n  color: #D7D7D7;\n}\n\n.footer2 p {\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 400;\n  font-size: 12px;\n  line-height: 36px;\n  color: #828282;\n}\n\n.item {\n  display: flex;\n  flex-direction: column;\n  justify-self: center;\n}\n.item-img {\n  object-fit: cover;\n  flex-shrink: 0;\n  width: 200px;\n  height: 220px;\n  border-radius: 10px;\n  transition: 0.3s;\n  cursor: pointer;\n}\n.item-img:hover {\n  transform: scale(1.05);\n}\n.item-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid white;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 24px;\n  color: #FFFFFF;\n}\n.item-date {\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 400;\n  font-size: 12px;\n  line-height: 24px;\n  color: #BCBCBC;\n}\n\n.filters {\n  display: flex;\n  align-items: center;\n}\n.filters .filter {\n  display: flex;\n  align-items: center;\n  margin-right: 30px;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 500;\n  font-size: 12px;\n  color: #FFFFFF;\n}\n.filters .filter svg {\n  margin-right: 5px;\n  margin-left: 5px;\n}\n.filters .filterbtn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100px;\n  height: 30px;\n  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);\n  border: none;\n  border-radius: 10px;\n  font-family: \"Poppins\";\n  font-style: normal;\n  font-weight: 500;\n  font-size: 12px;\n  color: #FFFFFF;\n}\n.filters .filterbtn svg {\n  margin-right: 5px;\n}\n\n@media screen and (max-width: 1500px) {\n  .landingpage {\n    max-width: 1200px;\n  }\n}\n@media screen and (max-width: 1040px) {\n  .box {\n    flex-direction: column;\n  }\n   .infobox {\n    max-width: none;\n    margin-bottom: 50px;\n  }\n  .box .display {\n    display: none;\n    max-height: none;\n    max-width: none;\n  }\n\n  .auction .nft {\n    grid-template-columns: auto auto;\n    justify-content: space-around;\n  }\n\n  .discover-items {\n    grid-template-columns: auto auto auto;\n    justify-content: space-around;\n  }\n\n  .footer {\n    flex-direction: column;\n  }\n  .footer-main {\n    max-width: 80%;\n    margin-bottom: 50px;\n    text-align: center;\n  }\n  .footer-navigate .nav:first-child {\n    margin: 0;\n  }\n}\n@media screen and (max-width: 925px) {\n  .navlinkwrap {\n    display: none;\n  }\n\n  .buttonwrap {\n    display: none;\n  }\n\n  .hamburger {\n    display: flex !important;\n    align-items: center;\n  }\n\n  .started-slimtext {\n    text-align: center;\n  }\n}\n@media screen and (max-width: 825px) {\n  .started-items {\n    display: grid;\n    grid-template-columns: auto auto;\n    justify-content: space-evenly;\n    padding: 50px 0;\n  }\n  .started-items:before {\n    height: 200px;\n    top: 90px;\n    filter: blur(120px);\n  }\n\n  .discover-items {\n    grid-template-columns: auto auto;\n    justify-content: space-around;\n  }\n}\n@media screen and (max-width: 700px) {\n  .box {\n    flex-direction: column;\n  }\n   .infobox {\n    max-height: none;\n    max-width: none;\n    margin-bottom: 50px;\n  }\n  .box .display {\n    display: block;\n    max-height: none;\n    max-width: none;\n  }\n\n  .discover-title {\n    justify-content: center;\n  }\n  .discover-title .filters {\n    display: none;\n  }\n\n  .auction .title {\n    justify-content: center;\n  }\n  .auction .title .titleslim {\n    display: none;\n  }\n}\n@media screen and (max-width: 600px) {\n  .landingpage {\n    padding: 0 20px;\n  }\n\n   .infobox-boldtext {\n    font-size: 45px;\n    line-height: 50px;\n  }\n   .infobox-slimtext {\n    font-size: 12px;\n    line-height: 16px;\n  }\n\n  .discover-items {\n    grid-template-columns: auto;\n    justify-content: space-around;\n  }\n\n  .auction .nft {\n    grid-template-columns: auto;\n    justify-content: space-around;\n  }\n\n  .footer-main {\n    font-size: 20px;\n    line-height: 30px;\n    max-width: 100%;\n    margin-bottom: 50px;\n    text-align: center;\n  }\n\n  .footer-navigate {\n    justify-content: space-between;\n    width: 100%;\n  }\n  .footer-navigate .nav {\n    margin-left: 20px;\n  }\n  .footer-navigate .nav h5 {\n    font-size: 15px;\n    line-height: 30px;\n  }\n  .footer-navigate .nav p {\n    font-size: 10px;\n    line-height: 18px;\n  }\n}\n@media screen and (max-width: 480px) {\n  .landingpage  .infobox-boldtext {\n    font-size: 32px;\n    line-height: 1.4em;\n    text-align: center;\n  }\n  .landingpage  .infobox-slimtext {\n    text-align: center;\n  }\n  .landingpage  .infobox-btnwrapper {\n    justify-content: center;\n  }\n}\n@keyframes leftslide {\n  from {\n    transform: translateX(-700px);\n  }\n  to {\n    transform: translateX(0px);\n  }\n}\n@keyframes rightslide {\n  from {\n    transform: translateX(550px);\n  }\n  to {\n    transform: translateX(0px);\n  }\n}\n .css-input { border-color:#cccccc; text-align:center; font-size:1.5vh; border-width:3px; border-radius:15px; border-style:solid; background-color:#1f1d2b; color:#ffffff; box-shadow: 3px 2px 11px 0px rgba(42,42,42,.90); font-style:none; font-family:sans-serif; font-weight:bold; padding:8px;  }\n.css-input:focus { outline:none; } \n  " }} />
  <div className="landingpage">
    <div className="navbar">
      <a className="navlogo" style={{fontSize: '5vh'}}>Andromeda Miner</a>
      <button className="hamburger">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
    </div>
    <div className="box">
      <div className="infobox">
        <p className="infobox-boldtext">
          Welcome to Andromeda Miner
        </p>
        <p className="infobox-slimtext">
          Are you ready to discover new places?
        </p>
        <div className="infobox-btnwrapper">
          <a href="https://t.me" target="_blank" style={{textDecoration: 'none'}}><button style={{marginRight: '10px'}} className="infobox-explorebtn selected">Explore</button></a>
          <a href="https://bscscan.com" target="_blank" style={{textDecoration: 'none'}}><button className="infobox-explorebtn selected">Explore</button></a>
        </div>
      </div>
      <div className="display">
        <img className="display-nft" src="https://www.nasa.gov/sites/default/files/styles/full_width/public/images/650137main_pia15416b-43_full.jpg" alt="unsplash-OG44d93i-NJk" border={0} />
      </div>
    </div>
    <div className="started">
      <center><p className="started-boldtext">Getting started</p>
        <p className="started-slimtext">Follow these steps</p>
        <div className="started-items" style={{paddingRight: '0px'}}>
          <div className="itemwrapper">
            <div className="started-items-item">
              <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
                <path style={{stroke: 'none', fillRule: 'nonzero', fill: '#e0e0e0', fillOpacity: 1}} d="M24.7969 14.6719c.4375-.4414.4375-1.1524 0-1.5938-.4414-.4375-1.1524-.4375-1.5938 0L16.5 19.7851l-2.9531-2.957c-.4414-.4375-1.1524-.4375-1.5938 0-.4375.4414-.4375 1.1524 0 1.5938l3.75 3.75a1.1246 1.1246 0 0 0 1.5938 0Zm0 0" />
                <path style={{stroke: 'none', fillRule: 'evenodd', fill: '#e0e0e0', fillOpacity: 1}} d="M18.8086.957a2.6005 2.6005 0 0 0-1.6172 0L4.8164 4.9688C3.7344 5.3202 3 6.3241 3 7.4648V15c0 9.2852 5.6563 16.0586 14.1016 19.246a2.5853 2.5853 0 0 0 1.7968 0C27.3438 31.0587 33 24.2853 33 15V7.4648a2.6182 2.6182 0 0 0-1.8164-2.496Zm-.9219 2.1368a.3738.3738 0 0 1 .2266 0l12.375 4.0117c.1601.0547.2617.1992.2617.3593V15c0 8.1914-4.9219 14.2227-12.6445 17.1367a.2815.2815 0 0 1-.211 0C10.172 29.2227 5.25 23.1914 5.25 15V7.4648c0-.1601.1016-.3046.2617-.3593Zm0 0" />
              </svg>
            </div>
            <p style={{fontSize: '1rem'}}>1 - Connect your wallet</p>
          </div>
          <div className="itemwrapper">
            <div className="started-items-item">
              <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
                <path style={{stroke: 'none', fillRule: 'evenodd', fill: '#bdbdbd', fillOpacity: 1}} d="M4.125 3C2.6758 3 1.5 4.1758 1.5 5.625v5.25c0 1.4492 1.1758 2.625 2.625 2.625h27.75c1.4492 0 2.625-1.1758 2.625-2.625v-5.25C34.5 4.1758 33.3242 3 31.875 3Zm27.75 2.25H4.125c-.207 0-.375.168-.375.375v5.25c0 .207.168.375.375.375h27.75c.207 0 .375-.168.375-.375v-5.25c0-.207-.168-.375-.375-.375Zm0 0" />
                <path style={{stroke: 'none', fillRule: 'nonzero', fill: '#bdbdbd', fillOpacity: 1}} d="M4.125 15c.621 0 1.125.504 1.125 1.125v14.25c0 .207.168.375.375.375h24.75c.207 0 .375-.168.375-.375v-14.25c0-.621.504-1.125 1.125-1.125S33 15.504 33 16.125v14.25C33 31.8242 31.8242 33 30.375 33H5.625C4.1758 33 3 31.8242 3 30.375v-14.25C3 15.504 3.504 15 4.125 15Zm0 0" />
                <path style={{stroke: 'none', fillRule: 'nonzero', fill: '#bdbdbd', fillOpacity: 1}} d="M14.625 17.25c-.621 0-1.125.504-1.125 1.125s.504 1.125 1.125 1.125h6.75c.621 0 1.125-.504 1.125-1.125s-.504-1.125-1.125-1.125Zm0 0" />
              </svg>
            </div>
            <p style={{fontSize: '1rem'}}>2 - Deposit a BNB amount</p>
          </div>
          <div className="itemwrapper">
            <div className="started-items-item">
              <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
                <path style={{stroke: 'none', fillRule: 'evenodd', fill: '#bdbdbd', fillOpacity: 1}} d="M30.9453.5a16.7245 16.7245 0 0 0-11.4687 4.5508l-2.0274 1.914a35.9135 35.9135 0 0 0-2.3984 2.4805h-7.836c-.957 0-1.8437.5-2.3359 1.3203L.668 17.7891c-.1952.3242-.2226.7226-.0702 1.0664.1523.3476.4609.5976.828.6758l7.1134 1.496c.0586.0782.125.1485.1992.2188l3.1054 2.914 2.9102 3.1016c.0703.0742.1406.1406.2188.1992l1.496 7.1133c.0782.3672.3282.6758.6758.8281a1.158 1.158 0 0 0 1.0664-.0703l7.0235-4.211a2.7222 2.7222 0 0 0 1.3203-2.3358v-7.836a36.8748 36.8748 0 0 0 2.4844-2.3984l1.9101-2.0274A16.7411 16.7411 0 0 0 35.5 5.0508l-.004-1.8281C35.496 1.7187 34.2774.5 32.7774.5Zm-6.7226 22.3398a39.89 39.89 0 0 1-1.582 1.1172l-5.2813 3.5196 1.0547 5.0156 5.621-3.3711c.1172-.0703.1876-.1992.1876-.336ZM8.5234 18.6406l3.5196-5.2812a34.8776 34.8776 0 0 1 1.1172-1.582H7.2148a.3952.3952 0 0 0-.3359.1913L3.508 17.586ZM21.0781 6.75a14.3862 14.3862 0 0 1 9.8672-3.918h1.832c.211 0 .3868.1758.3868.3907v1.828c0 3.672-1.3985 7.2032-3.9141 9.8712l-1.9102 2.0273a34.7388 34.7388 0 0 1-5.996 5.0664l-5.1133 3.4102-2.711-2.8906c-.0195-.0157-.0351-.0352-.0547-.0508l-2.8906-2.7149 3.4102-5.1172c1.457-2.1796 3.1523-4.1914 5.0625-5.9921Zm5.4766 5.0273c0 1.2891-1.043 2.332-2.332 2.332-1.2891 0-2.332-1.0429-2.332-2.332 0-1.289 1.0429-2.332 2.332-2.332 1.289 0 2.332 1.043 2.332 2.332ZM9.4453 32c1.3985-1.3984 1.3985-4.043 0-5.4453-1.4023-1.3985-4.0469-1.3985-5.4453 0-1.879 1.8828-2.246 6.0703-2.3164 7.3789a.3609.3609 0 0 0 .3828.3828C3.375 34.2461 7.5625 33.879 9.4454 32Zm0 0" />
              </svg>
            </div>
            <p style={{fontSize: '1rem'}}>3 - Compound and get rewards!</p>
          </div>
        </div></center>
    </div>
    <hr />
    <center><div className="started" id="scrollHere">
        <p className="started-boldtext"><b>Andromeda Miner</b></p>
        <div className="miner-box" style={{paddingTop: '50px'}}>
          <div className="buttonwrap">
            <button className="createbtn selectedbtn">Unique Users - 200</button>
          </div>
          <p className="started-slimtext" style={{marginTop: '20px'}}><b>Contract Balance - 15 BNB</b></p>
          <p className="started-slimtext"><b>Your Rockets - 15</b></p>
          <p style={{marginTop: '30px'}} className="started-slimtext">BNB Amount</p>
          <input style={{marginTop: '1px'}} type="text" className="css-input" defaultValue="0.1" />
          <button className="infobox-createbtn" style={{marginTop: '20px', background: 'linear-gradient(45.91deg, #9B51E0 21.01%, rgba(48, 129, 237, 0.8) 100%)'}}>Build Rockets</button>
          <p style={{marginTop: '80px', marginBottom: '10px'}} className="started-slimtext"><b>Rewards - 0.003 BNB</b></p>
          <div className="infobox-btnwrapper-second" style={{paddingLeft: '50px'}}>
            <button className="infobox-createbtn" style={{background: 'linear-gradient(45.91deg, #9B51E0 21.01%, rgba(48, 129, 237, 0.8) 100%)'}}>Compound</button>
            <button className="infobox-createbtn" style={{background: 'linear-gradient(125.91deg, #9B51E0 21.01%, rgba(48, 129, 237, 0.8) 100%)'}}>Claim Rewards</button>
          </div>
        </div>
      </div></center>
    <div className="footer2">
      <div><p>Copyright Andromeda Miner</p></div>
    </div>
  </div>
</div>

  );
}
