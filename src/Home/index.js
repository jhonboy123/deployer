import { fontSize, styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import Connect from "./components/Connect";
import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import RewardsInfo from "./components/RewardsInfo";
import ContractInfoCard from "./components/ContractInfo";
import ProfitInfoCard from "./components/ProfitInfo";
import ReferralLink from "./components/ReferralLink";
import { useAuthContext } from "../providers/AuthProvider";
import Footer from "./components/Footer";
import imgLogo from '../assets/cotton_miner.jpg';
import nutritionImage from '../assets/nutrition.jpg';
// import imgRat from '../assets/'
import { config } from "../config";
import esIcon from "../assets/ESIcon.png";
import tgIcon from "../assets/TGIcon.png";
import twIcon from "../assets/TWIcon.png";
import img1 from "../assets/img1.png"
const Wrapper = styled("div")(({ theme }) => ({
  // maxWidth: 800,
  // maxWidth: "80%",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export default function Home() {
  const { address } = useAuthContext();

  return (
    <Wrapper>
      
            <div className="walletWrapper" align='middle'>
              <Connect />
            </div>
          
              <BakeCard />
            
          <div style={{display:"flex", justifyContent:"center"}}>
            <ReferralLink address={address} />
          </div>
          
    </Wrapper>
  );
}
