import React from "react";
import { Pagination } from "antd";

const PaginationItem = ({ current, total, pageSize, onChange }) => (
    <Pagination 
        current={current} 
        total={total} 
        pageSize={pageSize} 
        onChange={onChange} 
    />
);

export default PaginationItem;
