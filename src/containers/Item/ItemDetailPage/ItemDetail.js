import React from 'react';
import * as _ from 'lodash';
import { Image } from 'react-bootstrap';

import Wrapper from './ItemDetail.style';
import data from '../../../config/dataItems';
import { useNavigation } from 'react-navi';

const ItemDetail = ({ recordId }) => {
  const { navigate } = useNavigation();

  const curItem = _.find(data, function (e) {
    return (e.id = recordId);
  });
  const {
    name,
    type,
    amount,
    status,
    import_date,
    imageSrc,
    manager,
    note,
    item_value,
    total_value,
    total_borrowed,
    total_paid,
  } = curItem;

  return (
    <Wrapper>
      <div className="header-detail">
        <button size="sm" onClick={() => navigate(`/item/${recordId}/edit`)}>
          <i class="fas fa-edit"></i>
          <span>Chỉnh sửa</span>
        </button>
      </div>
      <div className="body-detail">
        <form>
          <div className="row">
            <div className="col-sm-6">
              {/* Name */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Tên: </label>
                <div className="col-sm-7">
                  <input type="text" className="text-input" value={name} />
                </div>
              </div>
              {/* Ảnh  */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Ảnh minh họa: </label>
                <div className="col-sm-7">
                  <Image rounded src={imageSrc} />
                </div>
              </div>
              {/* Import date */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Ngày nhập kho: </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="text-input"
                    value={import_date}
                  />
                </div>
              </div>
              {/* Type */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Loại: </label>
                <div className="col-sm-7">
                  <input type="text" className="text-input" value={type} />
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="col-sm-6">
              {/* Amount */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Số lượng: </label>
                <div className="col-sm-7">
                  <input type="text" className="text-input" value={amount} />
                </div>
              </div>
              {/* Manager */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">
                  Người quản lý/ Đơn vị quản lý:
                </label>
                <div className="col-sm-7">
                  <input type="text" className="text-input" value={manager} />
                </div>
              </div>
              {/* Status */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Tình trạng: </label>
                <div className="col-sm-7">
                  <input type="text" className="text-input" value={status} />
                </div>
              </div>
              {/* Item value */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Đơn giá : </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="text-input"
                    value={item_value}
                  />
                </div>
              </div>
              {/* total value */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Tổng giá trị : </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="text-input"
                    value={total_value}
                  />
                </div>
              </div>
              {/* total borrowed */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Đã mượn: </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="text-input"
                    value={total_borrowed}
                  />
                </div>
              </div>
              {/* total paid */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Đã trả: </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="text-input"
                    value={total_paid}
                  />
                </div>
              </div>
              {/* note */}
              <div className="row group-form">
                <label className="col-sm-5 label-input">Ghi chú: </label>
                <div className="col-sm-7">
                  <input type="text-area" className="text-input" value={note} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};
export default ItemDetail;
