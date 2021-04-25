import React, { useCallback } from 'react';
import './header.css';
import { Link } from 'react-navi';
import { useHistory } from 'react-router-dom';
import useAlert from 'hooks/useAlert';
import { auth } from 'database';

import { LogOut, Lock } from 'react-feather';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function Header() {
  const { setAlert } = useAlert();
  const history = useHistory();

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
      <Link href="/" className="header-left">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/assetsmanagementfirebase.appspot.com/o/images%2Flogo2_new.png?alt=media&token=338cbb32-2c47-4945-bfcd-081bf460eb54"
          alt="logo"
        />
        <span className="logo-txt">UET Assets Management</span>
      </Link>
      <div className="header-right">
        <ul className="nav">
          <li className="nav-item">
            <DropdownButton id="dropdown-basic-button" title="Admin">
              <Dropdown.Item> Change password</Dropdown.Item>
              <Dropdown.Item onClick={logout}>
                <LogOut size={15} />
                Log out
              </Dropdown.Item>
            </DropdownButton>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Header;
