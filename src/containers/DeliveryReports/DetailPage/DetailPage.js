import React, { useState, useMemo, useCallback, useContext } from 'react';
import { isEmpty } from 'lodash';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Trash2, Edit, Printer, FileText, ExternalLink } from 'react-feather';
import { useParams, useHistory, Link } from 'react-router-dom';

import { DeliveryReportContext } from 'contexts/DeliveryReportContext';
import { formatDateToString } from 'utils/helper';
import BaseModal from 'components/BaseModal';
import BreadCrumb from 'components/BreadCrumb';
import Label from 'components/Label';
import Loading from 'components/Loading';
import genHtmlTemplate from '../Printer/genHtmlTemplate';
import Wrapper from './DetailPage.styles';
import useDeleteDeliveryReport from 'hooks/useDeleteDeliveryReport';
import StatusBorrow from 'components/StatusBorrow';

const DetailPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data, loading } = useContext(DeliveryReportContext);
  const [modalConfirm, setShowModalConfirm] = useState(false);

  const restructureData = useMemo(() => {
    if (loading) {
      return {};
    }

    let order = data.find((e) => e.id === id);

    return order;
  }, [data, id, loading]);

  const [remove] = useDeleteDeliveryReport({
    id: id,
    orderDetails: restructureData?.order_details || [],
    callback: () => {
      history.push('/dashboard/delivery_reports');
    },
  });

  const pdfGenerator = useCallback(() => {
    let printContents = genHtmlTemplate({ dataDevices: restructureData.order_details || [] });
    const w = window.open();
    w.document.write(printContents);
    setTimeout(() => {
      w.print();
      w.close();
    }, 30000);
  }, [restructureData]);

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
  if (loading || isEmpty(restructureData)) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="group-btn-action">
        <Button variant="danger" size="sm" onClick={() => setShowModalConfirm(true)}>
          <Trash2 size={20} />
        </Button>
        <Button variant="light" className="btn-print" size="sm" onClick={() => pdfGenerator()}>
          <Printer size={20} />
          In biên bản
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

      <Row className="info-item">
        <Col md={2}>
          <Label>Người mượn: </Label>
        </Col>
        <Col md={6}>
          <div className="item-value">{restructureData?.user_name}</div>
        </Col>
      </Row>
      <Row className="info-item">
        <Col md={2}>
          <Label>Ngày mượn: </Label>
        </Col>
        <Col md={6}>
          <div className="item-value">{formatDateToString(restructureData?.date_borrowed?.seconds)}</div>
        </Col>
      </Row>
      <Row className="info-item">
        <Col md={2}>
          <Label>Ngày trả: </Label>
        </Col>
        <Col md={6}>
          <div className="item-value">{formatDateToString(restructureData?.date_return?.seconds) || '--/--/----'}</div>
        </Col>
      </Row>
      <Row className="info-item">
        <Col md={2}>
          <Label>Trạng thái: </Label>
        </Col>
        <Col md={6}>
          <div className="item-value">{<StatusBorrow status={restructureData?.status} />}</div>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Label>Biên bản giao nhận: </Label>
        </Col>
      </Row>
      <Row className="info-item">
        <Col md={2}></Col>
        <Col md={6}>
          {(restructureData?.files || []).map((file, index) => (
            <div key={index} className="item-file">
              <a href={file.url} target="_blank" rel="noreferrer">
                <FileText size={20} />
                <span>{file.name}</span>
              </a>
            </div>
          ))}
        </Col>
      </Row>

      <Row className="info-item">
        <Col md={3}>
          <Label>Danh sách tài sản: </Label>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Model</th>
                <th>Số seri</th>
                <th>Tên</th>
                <th>Số lượng</th>
                <th>Đơn vị</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {!restructureData.order_details && (
                <tr>
                  <td colSpan={6}>Không có dữ liễu để hiển thị</td>
                </tr>
              )}
              {!!restructureData.order_details &&
                restructureData?.order_details.map((e, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{e.model_number}</td>
                    <td>{e.serial_number}</td>
                    <td className="td-name">
                      <Link to={`/dashboard/devices/${e.id_device}/detail`} target="_blank">
                        {e.name}
                        <ExternalLink size={20} />
                      </Link>
                    </td>
                    <td>1</td>
                    <td>{e.unit}</td>
                    <td>{e.status_order}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}>Tổng</td>
                <td>{restructureData?.order_details.length}</td>
                <td />
                <td />
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="info-item">
        <Col md={12}>
          <Label>Ghi chú: </Label>
          <textarea rows={2} className="detail-memo" defaultValue={restructureData?.note} />
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
export default DetailPage;
