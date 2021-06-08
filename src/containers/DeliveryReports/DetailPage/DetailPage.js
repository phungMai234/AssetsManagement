import React, { useState, useMemo, useCallback, useContext } from 'react';
import { isEmpty, sum } from 'lodash';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Trash2, Edit, Printer, FileText, ExternalLink, AlertTriangle } from 'react-feather';
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
import useGetDetail from 'hooks/useGetDetail';

const DetailPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data, loading } = useContext(DeliveryReportContext);
  const { data: dataOrder, loadingOrder } = useGetDetail({ nameCollection: 'orders', id });
  const [modalConfirm, setShowModalConfirm] = useState(false);

  const restructureData = useMemo(() => {
    if (loading || loadingOrder) {
      return {};
    }

    return dataOrder;
  }, [dataOrder, loading, loadingOrder]);

  const [remove] = useDeleteDeliveryReport({
    id: id,
    data: restructureData || [],
    callback: () => {
      history.push('/dashboard/delivery_reports');
    },
  });

  const pdfGenerator = useCallback(() => {
    let printContents = genHtmlTemplate({ dataDevices: restructureData.orderDetails || [] });
    const w = window.open();
    w.document.write(printContents);
    setTimeout(() => {
      w.print();
      w.close();
    }, 3000);
  }, [restructureData]);

  const breadcrumb = [
    {
      url: '/dashboard/delivery_reports',
      title: 'Danh sách biên bản bàn giao',
    },
    {
      url: `/dashboard/delivery_reports/${id}/detail`,
      title: 'Chi tiết',
    },
  ];

  // const totalAssets = useMemo(() => {
  //   if (!restructureData) {
  //     return;
  //   }
  //   const result = restructureData?.orderDetails.map((e) => e.amount);
  //   return sum(result);
  // }, [restructureData]);

  // if (loading || isEmpty(restructureData)) {
  //   return <Loading />;
  // }

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
          <div className="item-value">{restructureData?.user_name?.label}</div>
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
                <th>Tên</th>
                <th>Danh sách Seri</th>
                <th>Số lượng</th>
                <th>Đơn vị</th>
              </tr>
            </thead>
            <tbody>
              {!restructureData.orderDetails && (
                <tr>
                  <td colSpan={6}>Không có dữ liễu để hiển thị</td>
                </tr>
              )}
              {!!restructureData.orderDetails &&
                restructureData?.orderDetails.map((e, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{e.device_info.label}</td>
                    <td className="td-name">
                      <Link to={`/dashboard/devices/${e.id_device}/detail`} target="_blank">
                        {e.device_info.value.name}
                        <ExternalLink size={20} />
                      </Link>
                    </td>
                    <td>
                      {e.listSeri.map((item) => (
                        <div key={item}>{item}</div>
                      ))}
                    </td>
                    <td>{e.amount}</td>
                    <td>{e.device_info.value.unit}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}>Tổng</td>
                <td>{restructureData?.total_amount || 0}</td>
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
                paddingRight: '5px',
              }}
            >
              <AlertTriangle size={50} fill={'#dc3545'} stroke="#fff" />
            </span>
            <span>Bạn có chắc chắn muốn xóa?</span>
          </>
        }
      />
    </Wrapper>
  );
};
export default DetailPage;
