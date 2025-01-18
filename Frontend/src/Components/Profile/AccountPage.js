import React from 'react';
import {Link} from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
function AccountPage(){
    return(
        <>
        <Link to='/addPost'><CiCirclePlus className='addPost'></CiCirclePlus></Link>
        </>
    )
}
export default AccountPage;