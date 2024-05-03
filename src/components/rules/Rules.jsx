import {memo} from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import PetsIcon from '@mui/icons-material/Pets';
import NoiseAwareIcon from '@mui/icons-material/NoiseAware';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import CategoryIcon from '@mui/icons-material/Category';
function Rules({rulesList}) {

    const iconStyle = {
        width: "40px",
        height: "40px",
    }

    const ListIcon = [
        {
            icon: <DeleteForeverIcon style={iconStyle} />,name: "trash"
        },
        {
            icon: <LocalFireDepartmentIcon style={iconStyle} />,name: "flame"
        },
        {
            icon: <SmokeFreeIcon style={iconStyle} />,name: "smoking"
        },
        {
            icon: <PetsIcon style={iconStyle} />,name: "pet"
        },
        {
            icon: <NoiseAwareIcon style={iconStyle} />,name: "noise"
        },
        {
            icon: <LunchDiningIcon style={iconStyle} />,name: "eat"
        },
        {
            icon: <CategoryIcon style={iconStyle} />,name: "item"
        }
    ]
    if(!rulesList){
        return null;
    }
    return(
        <div className="border-b-2 border-black/30 box-border p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Quy định</h1>
            <div className="grid grid-cols-2 gap-5 pl-6">
                {
                    rulesList.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 align-middle">
                            <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                                {ListIcon.map((icon, index) => {
                                    if(icon.name === item.rulesType){
                                        return icon.icon
                                    }
                                })}
                            </div>
                            <div className="ml-4">
                                <p className="font-medium text-gray-800 m-0 text-[1.7rem]">{item.rulesName}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default memo(Rules);