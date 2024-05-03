import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React from "react";
import { memo } from "react";
import ListImage from '../listimage/ListImage';
import { useLocation } from "react-router-dom";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
function Popup(props) {
    const location = useLocation();
    var currentURL = window.location.href;
    var url = new URL(currentURL);
  
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const { currentImageInit, imagesList, openPopup, setOpenPopup} = props;
    const [index, setIndex] = useState(0);
    
    
    const handleClose = () => {
        url.searchParams.delete('image');
        url.searchParams.delete('popup');
        window.history.replaceState({}, '', url);
        setOpenPopup(false); 
        console.log(setOpenPopup(false),openPopup);
    }

    console.log('popup');

    return (
        <Dialog 
        fullScreen 
        open={openPopup}
        PaperProps={{
            style: {
              backgroundColor: "black",
              boxShadow: "none",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
            <DialogTitle>
                <div className='text-4xl text-white mt-4'>
                    <p>{index}/{imagesList?.length}</p>
                </div>
            </DialogTitle>
            <DialogContent>
                <ListImage setIndex={setIndex} currentImageInit={currentImageInit} imagesList={imagesList}></ListImage>
            </DialogContent>
            <DialogActions>
                <div className='flex text-white cursor-pointer justify-between w-[70px] fixed top-10 left-10' onClick={handleClose}>
                    <FontAwesomeIcon style={{marginLeft:"3px",padding:"4px"}} icon={icon({name: 'x', family: 'classic', style: 'solid'})} />
                    <p className="text-3xl font-bold m-0 p-0">Đóng</p>
                </div>

            </DialogActions>
        </Dialog>
    )
}

export default memo(Popup);