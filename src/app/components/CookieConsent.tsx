"use client"
import React, { useEffect, useState } from 'react'
import { Box, Modal, Typography } from "@mui/material";
import { initGA, trackPageView } from "../lib/GoogleAnalytices"

const CookieConsent = () => {

    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        const stored = localStorage.getItem("cookie_consent_status")
        if (!stored) {
            setShow(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("cookie_consent_status", "accepted")
        setShow(false)
        initGA();
        trackPageView(location.pathname);
    }
    const handleReject = () => {
        localStorage.setItem("cookie_consent_status", "rejected")
        setShow(false)
    }

    if (!show) return null;

   return (
        <Modal 
            open={show} 
            className='flex items-end justify-center p-4'
            sx={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0)' }} // افکت بلور برای شیک‌تر شدن
        >
            <Box 
                className="flex flex-col max-w-lg w-full outline-none"
                sx={{
                    backgroundColor: '#1E293B', // رنگ ذغالی مدیوم (تیره اما نه مشکی)
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid #334155', // یک بردر ظریف برای جدا شدن از بک‌گراند اصلی
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
                }}
            >
                <Typography className='text-[#E2E8F0] text-sm leading-6 mb-2'>
                    This website uses cookies to ensure proper functionality and to analyze traffic. 
                    By clicking <strong>“Accept”</strong>, you agree to the use of cookies.
                </Typography>
                <Typography className='text-[#94A3B8] text-xs mb-6'>
                    Necessary cookies are always active and do not require your consent.
                </Typography>
                
                <div className='flex flex-wrap justify-end gap-3'>
                    <button 
                        className='min-w-30 px-6 py-2 rounded-lg text-[#94A3B8] border border-[#334155] hover:bg-[#334155] hover:text-white transition-all cursor-pointer text-sm font-medium' 
                        onClick={handleReject}
                    >
                        Reject
                    </button>
                    <button 
                        className='min-w-30 bg-[#F59E0B] px-6 py-2 rounded-lg text-[#1E293B] font-bold hover:bg-[#D97706] transition-all cursor-pointer text-sm shadow-lg' 
                        onClick={handleAccept}
                    >
                        Accept All
                    </button>
                </div>
            </Box>
        </Modal>
    )
}

export default CookieConsent
