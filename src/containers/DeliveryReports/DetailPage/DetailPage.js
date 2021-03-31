import React, { useState, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import Wrapper from './DetailPage.styles';
import Label from 'components/Label';
import BreadCrumb from 'components/BreadCrumb';
import { formatDateToString } from 'utils/helper';
import { Trash2, Edit } from 'react-feather';
import BaseModal from 'components/BaseModal';
import useDelete from 'hooks/useDelete';
import useGetDetailReport from 'hooks/useGetDetailReport';
import Loading from 'components/Loading';

const DetailPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [modalConfirm, setShowModalConfirm] = useState(false);

  const [remove] = useDelete({
    id: id,
    nameCollection: 'orders',
    callback: () => {
      history.push('/dashboard/delivery_reports');
    },
  });

  const { data: data, loading } = useGetDetailReport({ id: id });

  const formatData = useMemo(() => {
    if (loading || isEmpty(data)) return {};
    console.log('tmp1', { info: data?.fake, devices: data?.devices });
    return { ...data?.fake, devices: data?.devices };
  }, [data, loading]);

  const breadcrumb = [
    {
      url: '/dashboard/delivery_reports',
      title: 'Danh sách các biên bản bàn giao',
    },
    {
      url: `/dashboard/delivery_reports/${id}/detail`,
      title: 'Chi tiết',
    },
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <BreadCrumb breadcrumb={breadcrumb} />

      <div className="group-btn-action">
        <Button variant="secondary" size="sm" onClick={() => setShowModalConfirm(true)}>
          <Trash2 size={20} />
        </Button>
        <Button
          size="sm"
          variant="info"
          className="btn-edit"
          onClick={() => history.push(`/dashboard/delivery_reports/${id}/edit`)}
        >
          <Edit size={15} />
          Chỉnh sửa
        </Button>
      </div>

      <Row>
        <Col md={6}>
          <Row className="info-item">
            <Col md={6}>
              <Label>Người mượn: </Label>
            </Col>
            <Col md={4}>
              <div className="item-value">{data?.user_name}</div>
            </Col>
          </Row>
          <Row className="info-item">
            <Col md={6}>
              <Label>Ngày mượn: </Label>
            </Col>
            <Col md={6}>
              <div className="item-value">{formatDateToString(data?.date_borrowed?.seconds)}</div>
            </Col>
          </Row>
          <Row className="info-item">
            <Col md={6}>
              <Label>Ngày trả: </Label>
            </Col>
            <Col md={6}>
              <div className="item-value">{formatDateToString(data?.date_return?.seconds)}</div>
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
        onCancel={setShowModalConfirm}
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
export default DetailPage;
