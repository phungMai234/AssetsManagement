import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import Wrapper from './ItemDetail.style';
import Label from 'components/Label';
import BreadCrumb from 'components/BreadCrumb';
import { formatStringToMoney, formatDateToString } from 'utils/helper';
import { Trash2, Edit3 } from 'react-feather';
import BaseModal from 'components/BaseModal';
import useDelete from 'hooks/useDelete';
import useGetDetail from 'hooks/useGetDetail';
import Loading from 'components/Loading';
import PhotoSlider from 'components/PhotoSlider';
import db from 'database';

const ItemDetail = () => {
  const { id } = useParams();
  const history = useHistory();

  const [modalConfirm, setShowModalConfirm] = useState(false);
  const [typeName, setTypeName] = useState('');

  const [remove] = useDelete({
    id: id,
    nameCollection: 'devices',
    callback: () => {
      history.push('/dashboard/devices');
    },
  });

  const { data, loading: loadingItems } = useGetDetail({ nameCollection: 'devices', id: id });

  const breadcrumb = [
    {
      url: '/dashboard/devices',
      title: 'Danh sách các thiết bị',
    },
    {
      url: `/dashboard/devices/${id}/detail`,
      title: 'Chi tiết',
    },
  ];

  useEffect(() => {
    if (loadingItems || !data) return;

    db.collection('categories')
      .doc(data?.id_category)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.exists) {
          setTypeName(querySnapshot.data()?.name);
        }
      });
  }, [data, loadingItems]);

  if (loadingItems) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <BreadCrumb breadcrumb={breadcrumb} />

      <div className="group-btn-action">
        <Button variant="danger" size="sm" onClick={() => setShowModalConfirm(true)}>
          <Trash2 size={20} />
        </Button>
        <Button
          size="sm"
          variant="info"
          className="btn-edit"
          onClick={() => history.push(`/dashboard/devices/${id}/edit`)}
        >
          <Edit3 size={15} />
          Chỉnh sửa
        </Button>
      </div>
      <h3 className="title">{data?.name}</h3>

      <Row>
        <Col md={6} lg={5} className="wrapper-image">
          <div className="image-slider">
            <PhotoSlider data={data?.image_detail} isPreview interval={null} />
          </div>
        </Col>
        <Col md={1} />
        <Col md={5}>
          <div className="info-item">
            <Label>Model Number: </Label>
            <div className="item-value">{data?.model_number}</div>
          </div>
          <div className="info-item">
            <Label>Serial Number: </Label>
            <div className="item-value">{data?.serial_number}</div>
          </div>
          <div className="info-item">
            <Label>Loại tài sản: </Label>
            <div className="item-value">{typeName}</div>
          </div>
          <div className="info-item">
            <Label>Tên tài sản: </Label>
            <div className="item-value">{data?.name}</div>
          </div>
          <div className="info-item">
            <Label>Ngày mua: </Label>
            <div className="item-value">{formatDateToString(data?.import_date?.seconds)}</div>
          </div>
          <div className="info-item">
            <Label>Giá 1 thiết bị: </Label>
            <div className="item-value">{formatStringToMoney(data?.price_each)} (vnđ)</div>
          </div>
          <div className="info-item">
            <Label>Số lượng trong kho: </Label>
            <div className="item-value">
              {data?.amount} {!!data?.unit && `(${data?.unit})`}
            </div>
          </div>
          <div className="info-item">
            <Label>Tổng số lượng: </Label>
            <div className="item-value">
              {data?.amount} {!!data?.unit && `(${data?.unit})`}
            </div>
          </div>
          <div>
            <Label>Mô tả: </Label>
            <textarea rows={8} className="detail-memo" defaultValue={data?.description} />
          </div>
        </Col>
      </Row>

      <BaseModal
        show={!!modalConfirm}
        onConfirm={() => {
          remove();
          setShowModalConfirm(false);
        }}
        onCancel={() => setShowModalConfirm(false)}
        typeBtnConfirm="danger"
        confirmText="Xóa"
        typeModal="sm"
        content={
          <>
            <span
              style={{
                color: '#dc3545',
                fontSize: '30px',
                paddingRight: '10px',
              }}
            >
              <Trash2 size={20} />
            </span>
            <span>Bạn có chắc chắn muốn xóa?</span>
          </>
        }
      />
    </Wrapper>
  );
};
export default ItemDetail;
