import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import Wrapper from './ItemDetail.style';
import Label from 'components/Label';
import BreadCrumb from 'components/BreadCrumb';
import { formatStringToMoney, formatDateToString } from 'utils/helper';
import { Trash2, Edit } from 'react-feather';
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

  useEffect(() => {
    if (loadingItems || !data) return;

    db.collection('productlines')
      .doc(data?.id_productline)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.exists) {
          setTypeName(querySnapshot.data()?.name);
        }
      });
  }, [data, loadingItems]);

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
          variant="warning"
          className="btn-edit"
          onClick={() => history.push(`/dashboard/devices/${id}/edit`)}
        >
          <Edit size={15} />
          Chỉnh sửa
        </Button>
      </div>
      <h3 className="title">{data?.name}</h3>

      <Row>
        <Col md={6}>
          <div className="image-slider">
            <PhotoSlider data={data?.image_detail} isPreview interval={null} />
          </div>
        </Col>

        <Col md={6}>
          <Row className="info-item">
            <Col md={6}>
              <Label>Mã tài sản: </Label>
            </Col>
            <Col md={6}>
              <div className="item-value">{data?.code}</div>
            </Col>
          </Row>
          <Row className="info-item">
            <Col md={6}>
              <Label>Loại tài sản: </Label>
            </Col>
            <Col md={4}>
              <div className="item-value">{typeName}</div>
            </Col>
          </Row>
          <Row className="info-item">
            <Col md={6}>
              <Label>Ngày mua: </Label>
            </Col>
            <Col md={6}>
              <div className="item-value">{formatDateToString(data?.purchase_date?.seconds)}</div>
            </Col>
          </Row>
          <Row className="info-item">
            <Col md={6}>
              <Label>Giá 1 thiết bị: </Label>
            </Col>
            <Col md={6}>
              <div className="item-value">{formatStringToMoney(data?.price_each)} (vnđ)</div>
            </Col>
          </Row>
          <Row className="info-item">
            <Col md={6}>
              <Label>Số lượng trong kho: </Label>
            </Col>
            <Col md={6}>
              <div className="item-value">
                {data?.amount} {!!data?.unit && `(${data?.unit})`}
              </div>
            </Col>
          </Row>
          <Row className="info-item">
            <Col md={12}>
              <Label>Mô tả: </Label>
              <textarea rows={8} className="detail-memo" defaultValue={data?.description} />
            </Col>
          </Row>
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
