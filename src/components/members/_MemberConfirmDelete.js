import React from 'react';
import { connect } from 'react-redux';
import { confirmDeleteMembersClose, deleteMembersRequest } from '../../redux/members/membersAction';

function MemberConfirmDelete({closeConfirmDelete, deleteMember, id}){
  const handleClickCloseConfirmDelete = () => {
    closeConfirmDelete();
  }

  const handleClickDeleteMember = () => {
    deleteMember(id);
  }
  return (
    <>
      <div
        className="
          justify-center items-center 
          flex overflow-x-hidden overflow-y-auto 
          fixed inset-0 z-50 outline-none 
          focus:outline-none"
      >
        <div className="relative w-auto my-8 mx-auto max-w-3xl">
          {/*content*/}
          <div 
            className="
              border-0 rounded-lg shadow-lg 
              relative flex flex-col w-full 
              bg-white outline-none 
              focus:outline-none">
            {/*header*/}
            <div 
              className="
                flex items-start justify-between 
                p-3 border-b border-solid 
                border-gray-300 rounded-t">
              <h3 className="text-1xl font-semibold">Konfirmasi Hapus</h3>
              <button onClick={handleClickCloseConfirmDelete}>
                <span className="text-black "> × </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <button
                  onClick={handleClickCloseConfirmDelete}
                  className="
                    text-black-500 background-transparent 
                    font-bold uppercase px-6 py-2 
                    border text-sm outline-none 
                    focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                > Tutup </button>
                <button
                  onClick={handleClickDeleteMember}
                  className="
                    text-red-500 background-transparent 
                    border hover:ring-red-300 font-bold 
                    uppercase px-6 py-2 text-sm outline-none 
                    focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                > Hapus </button>
              </div>
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    id: state.membersReducer.confirmDeleteId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeConfirmDelete: () => {
      dispatch(confirmDeleteMembersClose())
    },
    deleteMember: (id) => {
      dispatch(deleteMembersRequest(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberConfirmDelete);