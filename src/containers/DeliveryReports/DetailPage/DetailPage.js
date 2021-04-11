import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import { Row, Col, Button, Table, Container } from 'react-bootstrap';
import Wrapper from './DetailPage.styles';
import Label from 'components/Label';
import BreadCrumb from 'components/BreadCrumb';
import { formatDateToString } from 'utils/helper';
import { Trash2, Edit, Printer, FileText, ExternalLink } from 'react-feather';
import BaseModal from 'components/BaseModal';
import useDelete from 'hooks/useDelete';
import { useGetDetailReport } from 'hooks/useGetDetailReport';
import useGetDetail from 'hooks/useGetDetail';
import Loading from 'components/Loading';
import genHtmlTemplate from '../Printer/genHtmlTemplate';
import { find } from 'lodash';
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

  const { data: orders, loading: loadingDataOrder } = useGetDetail({ nameCollection: 'orders', id: id });
  const { dataOrderDetail, dataDevice, loading: loadingOrderDetail } = useGetDetailReport({ id: id });

  const restructData = useMemo(() => {
    if (!orders || !dataOrderDetail?.length || !dataDevice?.length) {
      return {};
    }

    const newDataOrder = [...dataOrderDetail].map((e) => {
      const device = find([...dataDevice], (item) => item.id_device === e.id_device);

      return {
        ...device,
        ...e,
      };
    });

    return { ...orders, list_order: newDataOrder };
  }, [dataDevice, dataOrderDetail, orders]);

  const pdfGenerator = useCallback(() => {
    let printContents = genHtmlTemplate({ dataDevices: restructData?.list_order || [] });
    const w = window.open();
    w.document.write(printContents);
    setTimeout(() => {
      w.print();
      // w.close();
    }, 30000);
  }, [restructData]);

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
  if (loadingDataOrder || loadingOrderDetail) {
    return <Loading />;
  }

  return (
    <Container>
      <Wrapper>
        <BreadCrumb breadcrumb={breadcrumb} />

        <div className="group-btn-action">
          <Button variant="danger" size="sm" onClick={() => setShowModalConfirm(true)}>
            <Trash2 size={20} />
          </Button>
          <Button variant="info" className="btn-print" size="sm" onClick={() => pdfGenerator()}>
            <Printer size={20} />
            In biên bản
          </Button>
          <Button
            size="sm"
            variant="warning"
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
            <div className="item-value">{orders?.user_name}</div>
          </Col>
        </Row>
        <Row className="info-item">
          <Col md={2}>
            <Label>Ngày mượn: </Label>
          </Col>
          <Col md={6}>
            <div className="item-value">{formatDateToString(orders?.date_borrowed?.seconds)}</div>
          </Col>
        </Row>
        <Row className="info-item">
          <Col md={2}>
            <Label>Ngày trả: </Label>
          </Col>
          <Col md={6}>
            <div className="item-value">{formatDateToString(orders?.date_return?.seconds)}</div>
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
            {(restructData?.files || []).map((file, index) => (
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
                  <th>Mã tài sản</th>
                  <th>Tên</th>
                  <th>Số lượng</th>
                  <th>Đơn vị</th>
                  <th>Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {!restructData?.list_order && (
                  <tr>
                    <td colSpan={6}>Không có dữ liễu để hiển thị</td>
                  </tr>
                )}
                {!!restructData?.list_order &&
                  restructData?.list_order.map((e, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{e.id_device}</td>
                      <td className="td-name">
                        <Link to={`/dashboard/devices/${e.id_device}/detail`}>
                          {e.name}
                          <ExternalLink size={20} />
                        </Link>
                      </td>
                      <td>{e.quantity_ordered}</td>
                      <td>{e.unit}</td>
                      <td>{e.status}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
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
    </Container>
  );
};
export default DetailPage;
