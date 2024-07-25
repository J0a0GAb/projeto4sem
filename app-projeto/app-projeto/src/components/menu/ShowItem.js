import P from 'prop-types';
import React, { Fragment, useState } from 'react';
import * as BsIcons from "react-icons/bs";
import { Link } from 'react-router-dom';
import { BUTTON_SIZE } from '../../config/config';

const ShowItem = ( {item} ) => {

    const [open, setOpen] = useState(false)
    if (item.sub_menu){
        return (
        <Fragment>
            <div className={ open ? "app-sidebar-item open":"app-sidebar-item"}>
               <div className='app-sidebar-title'>
                    <span>
                        { item.icon && <i>{ item.icon }</i> }
                        { item.page }
                    </span>
                    <i><BsIcons.BsChevronDown
                            className='app-toggle-btn'
                            size={BUTTON_SIZE}
                            onClick={()=>setOpen(!open)}
                        />
                    </i>
                </div>
                <div className='app-sidebar-content'>
                    {
                        item.sub_menu.map((sub, index)=> {
                            return(
                            <ShowItem
                                key={index}
                                item={sub}
                            />
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
        )
    } else {
        return (
            <Fragment>
                <Link to={ item.path || "#" } className='app-sidebar-item plain'>
                    { item.icon && <i>{item.icon}</i>}
                    { item.page }
                </Link>
            </Fragment>
        )
    }

}

ShowItem.propTypes ={
  item:P.object
}

export default ShowItem;
