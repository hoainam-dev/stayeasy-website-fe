import {memo} from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import PoolIcon from '@mui/icons-material/Pool';
import WifiIcon from '@mui/icons-material/Wifi';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import SecurityIcon from '@mui/icons-material/Security';
import AirIcon from '@mui/icons-material/Air';
import WorkIcon from '@mui/icons-material/Work';
import IronIcon from '@mui/icons-material/Iron';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BedIcon from '@mui/icons-material/Bed';
import TvIcon from '@mui/icons-material/Tv';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import YardIcon from '@mui/icons-material/Yard';
import VrpanoIcon from '@mui/icons-material/Vrpano';
import HotTubIcon from '@mui/icons-material/HotTub';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FireplaceIcon from '@mui/icons-material/Fireplace';
function UtilitiesDetail({utilities}) {

    const iconStyle = {
        width: "40px",
        height: "40px",
    }

    const ListIcon = [
        { icon: <PetsIcon style={iconStyle} />, type: 'Pet' },
        { icon: <PoolIcon style={iconStyle} />, type: 'Pool' },
        { icon: <WifiIcon style={iconStyle} />, type: 'WIFI' },
        { icon: <SportsVolleyballIcon style={iconStyle} />, type: 'Game' },
        { icon: <DryCleaningIcon style={iconStyle} />, type: 'MS' },
        { icon: <SecurityIcon style={iconStyle} />, type: 'Security' },
        { icon: <AirIcon style={iconStyle} />, type: 'AC' },
        { icon: <WorkIcon style={iconStyle} />, type: 'Work' },
        { icon: <IronIcon style={iconStyle} />, type: 'BL' },
        { icon: <LocalLaundryServiceIcon style={iconStyle} />, type: 'MG' },
        { icon: <StorefrontIcon style={iconStyle} />, type: 'Shoping' },
        { icon: <BedIcon style={iconStyle} />, type: 'DT' },
        { icon: <TvIcon style={iconStyle} />, type: 'TV' },
        { icon: <LocalParkingIcon style={iconStyle} />, type: 'Park' },
        { icon: <YardIcon style={iconStyle} />, type: 'Garden' },
        { icon: <VrpanoIcon style={iconStyle} />, type: 'CQ' },
        { icon: <HotTubIcon style={iconStyle} />, type: 'Jacuzzi' },
        { icon: <FitnessCenterIcon style={iconStyle} />, type: 'Gym' },
        { icon: <KitchenIcon style={iconStyle} />, type: 'Kitchen' },
        { icon: <FireplaceIcon style={iconStyle} />, type: 'LS' }
    ]
    if(!utilities){
        return null;
    }
    return(
        <div className="border-b-2 border-black/30 box-border p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tiện ích</h1>
            <div className="grid grid-cols-2 gap-5 pl-6">
                {
                    utilities.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 align-middle">
                            <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                                {ListIcon.map((icon, index) => {
                                    if(icon.type === item.type){
                                        return icon.icon
                                    }
                                })}
                            </div>
                            <div className="ml-4">
                                <p className="font-bold text-gray-800 m-0 text-[1.7rem]">{item.utilitiesName}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default memo(UtilitiesDetail);