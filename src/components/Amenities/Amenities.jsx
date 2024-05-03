import { memo } from 'react';
import { 
        Wifi ,
        AcUnitRounded,
      TvOffOutlined,
      LocalLaundryServiceOutlined  ,
      DryCleaning ,
      KitchenOutlined,
      ParkOutlined,
      PoolOutlined,
      FitnessCenterOutlined,
      IronOutlined,
      HotTubRounded,
      YardRounded,
      WorkRounded,
      ShoppingCartRounded,
      SecurityOutlined,
      BedRounded,
      LandscapeRounded,
      PetsOutlined,
      FireplaceRounded,
      GamepadOutlined,
       } 
from '@mui/icons-material'; // Import latest rounded icons

function Amenities({ utilitiesList }) {
    const iconStyle = {
        width: "40px",
        height: "40px",
    };
    const ListIcon = [
        { icon: <Wifi style={iconStyle} />, name: "WIFI" },
        { icon: <AcUnitRounded style={iconStyle} />, name: "AC" },
        { icon: <LocalLaundryServiceOutlined style={iconStyle} />, name: "MG" },
        { icon: <DryCleaning style={iconStyle} />, name: "MS" },
        { icon: <KitchenOutlined style={iconStyle} />, name: "Kitchen" },
        { icon: <ParkOutlined style={iconStyle} />, name: "Park" },
        { icon: <TvOffOutlined style={iconStyle} />, name: "TV" },
        { icon: <IronOutlined style={iconStyle} />, name: "BL" },
        { icon: <PoolOutlined style={iconStyle} />, name: "Pool" },
        { icon: <FitnessCenterOutlined style={iconStyle} />, name: "Gym" },
        { icon: <HotTubRounded style={iconStyle} />, name: "Jacuzzi" },
        { icon: <YardRounded style={iconStyle} />, name: "Garden" },
        { icon: <WorkRounded style={iconStyle} />, name: "Work" },
        { icon: <SecurityOutlined style={iconStyle} />, name: "Security" },
        { icon: <GamepadOutlined style={iconStyle} />, name: "Game" },
        { icon: <BedRounded style={iconStyle} />, name: "DT" },
        { icon: <LandscapeRounded style={iconStyle} />, name: "CQ" },
        { icon: <ShoppingCartRounded style={iconStyle} />, name: "Shoping" },
        { icon: <PetsOutlined style={iconStyle} />, name: "Pet" },
        { icon: <FireplaceRounded style={iconStyle} />, name: "LS" },
    ];
    
    if (!utilitiesList) {
        return null;
    }
    return (
        <div className="border-b-2 border-black/30 box-border p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tiện ích</h1>
            <div className="grid grid-cols-2 gap-5 pl-6">
                {utilitiesList.map((utility, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                        {ListIcon.map((icon, index) => {
                                    if(icon.name === utility.type){
                                        return icon.icon
                                    }
                                })}
                        </div>
                        <div className="ml-4">
                            <p className="font-medium text-gray-800 m-0 text-[1.7rem]">{utility.utilitiesName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(Amenities);
