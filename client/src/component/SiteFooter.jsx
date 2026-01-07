import React from 'react';
const SiteFooter = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear();
    return(
        <div id='site-footer' className='siteFooter'>
            <p className='footerText'>All Copyright Reserved राजलक्ष्मी @ {currentYear} </p>
        </div>
    )
}

export default SiteFooter;