import React, { useCallback, useState } from 'react';
import './header.css';
import { Link } from 'react-navi';
import { useHistory } from 'react-router-dom';
import useAlert from 'hooks/useAlert';
import { auth } from 'database';

import { LogOut, User, Lock } from 'react-feather';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import ModalChangePassword from 'components/ModalChangePassword';

function Header() {
  const { setAlert } = useAlert();
  const history = useHistory();
  const [modalChangePass, setModalChangePass] = useState(false);
  const logout = useCallback(() => {
    auth
      .signOut()
      .then(() => {
        history.push('/auth/login');
      })
      .catch((error) => {
        setAlert({ status: 'danger', message: error.message });
      });
  }, [history, setAlert]);

  return (
    <>
      <Link href="/dashboard/categories" className="header-left">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/assetsmanagementfirebase.appspot.com/o/images%2Flogo2_new.png?alt=media&token=338cbb32-2c47-4945-bfcd-081bf460eb54"
          alt="logo"
        />
        <span className="logo-txt">UET Assets Management</span>
      </Link>
      <div className="header-right">
        <DropdownButton
          size="sm"
          menuAlign="right"
          title={
            <span>
              <User size={15} />
              Admin
            </span>
          }
          id="dropdown-menu-align-right"
        >
          <Dropdown.Item eventKey="1" onClick={() => setModalChangePass(true)}>
            <Lock size={15} />
            Thay đổi mật khẩu
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={logout}>
            <LogOut size={15} />
            Đăng xuất
          </Dropdown.Item>
        </DropdownButton>
        {modalChangePass && <ModalChangePassword onClose={setModalChangePass} />}
      </div>
    </>
  );
}
export default Header;
