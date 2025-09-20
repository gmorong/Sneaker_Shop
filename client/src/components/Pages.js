import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const Pages = () => {
    
    const {goods} = useContext(Context)

    const pageCount = Math.ceil(goods.totalCount / goods.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++){
        pages.push(i + 1)
    }

    return (
        <div className="pages mt-3">
            {pages.map( (page, index) => 
                <div key={index} className={goods.page === page ? 
                'page page-active' : 'page'}
                onClick={ () => goods.setPage(page)}>{page}</div>
            )}
        </div>
    );
};

export default observer(Pages);