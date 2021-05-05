import React from 'react';
import ReactExport from 'react-export-excel';
import fs from 'fs';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadExcel = ({ data }) => {
  return (
    <ExcelFile>
      <ExcelSheet data={data} name="Danh sách tài sản">
        <ExcelColumn label="Số kiểu(P/N)" value="model_number" />
        <ExcelColumn label="Số seri(S/N)" value="serial_number" />
        <ExcelColumn label="Tên" value="name" />
        <ExcelColumn label="Ngày mua" value="purchase_date" />
        <ExcelColumn label="Số lượng" value="amount" />
        <ExcelColumn label="Đơn vị" value="unit" />
        <ExcelColumn label="Tình trạng" value="current_status" />
        <ExcelColumn label="Mô tả" value="description" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default DownloadExcel;
