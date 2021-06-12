import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

import Wrapper from './ItemDetail.style';
import Label from 'components/Label';
import BreadCrumb from 'components/BreadCrumb';
import { formatStringToMoney, formatDateToString } from 'utils/helper';
import { Trash2, Edit3, AlertTriangle } from 'react-feather';
import BaseModal from 'components/BaseModal';
import useDeleteAsset from 'hooks/useDeleteAsset';
import useGetDetail from 'hooks/useGetDetail';
import Loading from 'components/Loading';
import PhotoSlider from 'components/PhotoSlider';
import db from 'database';
import { FREE } from 'utils/constant';

const ItemDetail = () => {
  const { id } = useParams();
  const history = useHistory();

  const [modalConfirm, setShowModalConfirm] = useState(false);
  const [typeName, setTypeName] = useState('');

  const { data, loading: loadingItems } = useGetDetail({ nameCollection: 'assets', id: id });

  const [remove] = useDeleteAsset({
    id: id,
    status: (!!data && data?.status) || FREE,
    callback: () => {
      history.push('/dashboard/assets');
    },
  });

  const breadcrumb = [
    {
      url: '/dashboard/assets',
      title: 'Danh sách tài sản',
    },
    {
      url: `/dashboard/assets/${id}/detail`,
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
      <Container>
        <BreadCrumb breadcrumb={breadcrumb} />

        <div className="group-btn-action">
          <Button variant="danger" size="sm" onClick={() => setShowModalConfirm(true)}>
            <Trash2 size={20} />
          </Button>
          <Button
            size="sm"
            variant="info"
            className="btn-edit"
            onClick={() => history.push(`/dashboard/assets/${id}/edit`)}
          >
            <Edit3 size={15} />
            Chỉnh sửa
          </Button>
        </div>
        <h3 className="title">{data?.name}</h3>

        <div className="wrapper-detail">
          <div className="wrapper-image">
            <div className="image-slider">
              {data?.image_detail && data?.image_detail?.length ? (
                <PhotoSlider data={data?.image_detail} isPreview interval={null} />
              ) : (
                <img
                  className="no-image"
                  src="https://firebasestorage.googleapis.com/v0/b/assetsmanagementfirebase.appspot.com/o/images%2Fno-image.png?alt=media&token=e885dc29-ba97-45c8-8f0f-acad14a7b946"
                  alt="no-image"
                />
              )}
            </div>
          </div>
          <div className="wrapper-info">
            <div className="info-item">
              <Label>Model: </Label>
              <div className="item-value">{data?.model_number}</div>
            </div>
            <div className="info-item">
              <Label>Số seri(S/N): </Label>
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
              <div className="item-value">{formatDateToString(data?.purchase_date?.seconds)}</div>
            </div>
            <div className="info-item">
              <Label>Tình trạng sử dụng: </Label>
              <div className="item-value">{data?.status}</div>
            </div>
            <div className="info-item">
              <Label>Tình trạng hiện tại: </Label>
              <div className="item-value">{data?.current_status}</div>
            </div>
            <div className="info-item">
              <Label>Giá 1 thiết bị: </Label>
              <div className="item-value">{formatStringToMoney(data?.price_each)} (vnđ)</div>
            </div>
            <div className="info-item">
              <Label>Đơn vị: </Label>
              <div className="item-value">{data?.unit}</div>
            </div>
            <div>
              <Label>Mô tả: </Label>
              <textarea rows={8} className="detail-memo" defaultValue={data?.description} />
            </div>
          </div>
        </div>

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
                  paddingRight: '5px',
                }}
              >
                <AlertTriangle size={50} fill={'#dc3545'} stroke="#fff" />
              </span>
              <span>Bạn có chắc chắn muốn xóa?</span>
            </>
          }
        />
      </Container>
    </Wrapper>
  );
};
export default ItemDetail;
