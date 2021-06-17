import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useCustomQuery } from 'hooks/useCustomQuery';
import TablePaginationData from 'components/TablePaginationData';
import Wrapper from './DetailPage.styles';
import { formatStringToMoney, formatDateToString } from 'utils/helper';
import BreadCrumb from 'components/BreadCrumb';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DetailPage = () => {
  let query = useQuery();
  const name = query.get('name');

  const { data, loading } = useCustomQuery({ name, url: 'assets' });

  const restructureData = useMemo(() => {
    if (!data) return [];
    return data.map((record, index) => {
      return {
        ...record,
        index: index + 1,
        amount: 1,
        picture:
          !!record?.image_detail && !!record?.image_detail.length ? (
            <img src={record?.image_detail[0].preview} alt="image_detail" />
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/assetsmanagementfirebase.appspot.com/o/images%2Fno-image.png?alt=media&token=e885dc29-ba97-45c8-8f0f-acad14a7b946"
              alt="no-image"
            />
          ),
        purchase_date: formatDateToString(record?.purchase_date?.seconds),
        original_price: formatStringToMoney(record.original_price),
        real_price: formatStringToMoney(record.real_price),
      };
    });
  }, [data]);

  const breadcrumb = [
    {
      url: '/dashboard/lectures',
      title: 'Danh sách cán bộ',
    },
    {
      url: '',
      title: 'Chi tiết',
    },
  ];

  return (
    <Wrapper>
      <BreadCrumb breadcrumb={breadcrumb} />
      <TablePaginationData
        columns={[
          {
            name: 'STT',
            field: 'index',
          },
          {
            name: 'Mã tài sản',
            field: 'serial_number',
          },
          {
            name: 'Tên',
            field: 'name',
          },

          {
            name: 'Ngày mua',
            field: 'purchase_date',
          },
          {
            name: 'Nơi sản xuất',
            field: 'origin',
          },
          {
            name: 'Số lượng',
            field: 'amount',
          },
          {
            name: 'Nguyên giá (VNĐ)',
            field: 'original_price',
          },
          {
            name: 'Giá trị còn lại',
            field: 'real_price',
          },
          {
            name: 'Mô tả',
            field: 'description',
          },
        ]}
        data={restructureData}
        loading={loading}
      />
    </Wrapper>
  );
};

export default DetailPage;
