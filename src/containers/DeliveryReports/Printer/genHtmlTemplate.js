export default ({ dataDevices, data }) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background: rgb(204,204,204); 
      }
      page {
        background: white;
        display: block;
        margin: 0 auto;
        margin-bottom: 0.5cm;
        box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
      }
      page[size="A4"] {  
        width: 21cm;
        height: 29.7cm; 
        padding: 2cm 2cm;
      }

      @media print {
        body, page {
          margin: 0;
          box-shadow: 0 !important;
        }
      }

      .header {
        display: flex;
        justify-content: space-between;
      }

      .header-left {
        font-weight: bold;
        text-align: center;
      }

      .header-right {
        text-align: center;
      }

      .label-header {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .date {
        margin-top: 10px;
        font-style: italic;
      }

      h2 {
        text-align: center;
        margin: 40px 0px;
      }

      .group-info {
        margin-top: 10px;
      }
      .index {
        font-weight: bold;
      }

      .info {
        padding-left: 20px;
      }

      table,
      th,
      td {
        border: 1px solid black;
        border-collapse: collapse;
      }

      td {
        text-align: center;
        vertical-align: middle;
        padding: 5px 10px;
      }

      .group-sign {
        padding: 20px;
        display: flex;
        justify-content: space-between;
      }

      .box-signature {
        text-align: center;
      }

      .people {
        font-weight: bold;
      }

      .description {
        font-style: italic;
        font-size: 12px;
      }

      .td-name{
        text-align: left;
      }
    </style>
  </head>
  <body>
  <page size="A4">
    <div class="header">
      <div class="header-left">
        <div class="label-header">ĐẠI HỌC QUỐC GIA HÀ NỘI</div>
        <div>ĐẠI HỌC CÔNG NGHỆ</div>
      </div>
      <div class="header-right">
        <div class="label-header">CÔNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div class="label-header">Độc lập - Tự do - Hạnh phúc</div>
        <div class="date">......., ngày .... tháng .... năm ....</div>
      </div>
    </div>

    <h2>BIÊN BẢN BÀN GIAO TÀI LIỆU, THIẾT BỊ</h2>

    <div>Hôm nay, ngày ${new Date().getDate()} tháng ${
  new Date().getMonth() + 1
} năm ${new Date().getFullYear()}, tại ...........................................chúng tôi gồm có:</div>

    <div class="group-info">
      <div class="index">I. Bên giao</div>
      <div class="info">
        <p>
         Phòng/Bộ phân: Khoa Công nghệ thông tin
        </p>
      </div>
    </div>
    <div class="group-info">
      <div class="index">II. Bên nhận</div>
      <div class="info">
        <p>
          Ông/bà:${data.user_name.label}
        </p>
        <p>
        Chức danh:............................ Phòng/Bộ phân:.....................................................................................................................
      </div>
    </div>

    <p>Cùng tiến hành bàn giao tài sản, công cụ, tài liệu với nội dung như sau:</p>

    <table style="width: 100%">
    <thead>
      <tr>
        <th>STT</th>
        <th>Model</th>
        <th>Tên tài sản</th>
        <th>Danh sách Số seri(S/N)</th>
        <th>Số lượng</th>
        <th>Đơn vị</th>
        <th>Tình trạng</th>
      </tr>
      </thead>
      <tbody>
      ${dataDevices.map(
        (item, index) =>
          ` <tr>
          <td>${index + 1}</td>
          <td class="td-name">${item.device_info.value.model_number}</td>
          <td class="td-name">${item.device_info.value.name}</td>
          <td class="td-name">
            ${item.listSeri.map((item) => `<div key=${item}>${item}</div>`)}
          </td>
          <td>${item.amount}</td>         
          <td>${item.device_info.value.unit}</td>
            <td>${item.device_info.value.current_status}</td>
          </tr>`,
      )}
      <tr>
        <td colspan="4">Tổng</td>
        <td>${data.total_amount}</td>
        <td />
        <td />
      </tr>
      </tbody>
     
    </table>

    <p>
      Người bàn giao cam đoan rằng toàn bộ các tài sản, công cụ, tài liệu đã nêu ở trên đã được bàn giao đầy đủ. Biên
      bản được lập thành ... bản, mỗi bên giữ một bản
    </p>

    <div class="group-sign">
      <div class="box-signature">
        <p class="people">Người bàn giao</p>
        <p class="description">(Ký, đóng dấu và ghi rõ họ tên)</p>
      </div>
      <div class="box-signature">
        <p class="people">Người nhận bàn giao</p>
        <p class="description">(Ký và ghi rõ họ tên)</p>
      </div>
    </div>
    </page>
  </body>
</html>

`;
