import Table from '@components/Table';
import useUsers from '@hooks/users/useGetUsers.jsx';
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import EmailIcon from '@mui/icons-material/Email';
import { useCallback, useState } from 'react';
import '@styles/users.css';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';
import useSendEmails from '../hooks/email/useSendEmail';
import FormularioSendEmail from '@components/FormularioSendEmail.jsx';

const Users = () => {
  const { users, fetchUsers, setUsers } = useUsers();
  const [filterRut, setFilterRut] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser,
  } = useEditUser(setUsers);

  const { handleDelete } = useDeleteUser(fetchUsers, setDataUser);

  const {
    formState,
    setFormState,
    isPopupOpen: isEmailPopupOpen,
    setIsPopupOpen: setEmailPopupOpen,
    handleSend,
  } = useSendEmails(fetchUsers);

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedUsers) => {
      setDataUser(selectedUsers);
      if (selectedUsers.length > 0) {
        setFormState({
          ...formState,
          email: selectedUsers[0]?.email || '',
        });
      }
    },
    [setDataUser, setFormState, formState]
  );

  const columns = [
    { title: 'Nombre', field: 'nombreCompleto', width: 350, responsive: 0 },
    { title: 'Correo electrónico', field: 'email', width: 300, responsive: 3 },
    { title: 'Rut', field: 'rut', width: 150, responsive: 2 },
    { title: 'Rol', field: 'rol', width: 200, responsive: 2 },
    { title: 'Creado', field: 'createdAt', width: 200, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Usuarios</h1>
          <div className="filter-actions">
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Rut'} />
            <button onClick={handleClickUpdate} disabled={dataUser.length === 0}>
              {dataUser.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button disabled={dataUser.length === 0} onClick={() => handleDelete(dataUser)}>
              {dataUser.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
            <button className="email-user-button" disabled={dataUser.length === 0} onClick={() => setEmailPopupOpen(true)}>
              <EmailIcon />
            </button>
          </div>
        </div>
        <Table
          data={users}
          columns={columns}
          filter={filterRut}
          dataToFilter={'rut'}
          initialSortName={'nombreCompleto'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} />
      {isEmailPopupOpen && (
        <FormularioSendEmail
          show={isEmailPopupOpen}
          setShow={setEmailPopupOpen}
          data={dataUser}
          action={handleSend}
        />
      )}
    </div>
  );
};

export default Users;
