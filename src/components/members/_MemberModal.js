import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { fetchMembersDetailRequest, modalMembersClose, saveMembersRequest, updateMembersRequest } from '../../redux/members/membersAction';

function MemberModal({closeModal, modalAttr, saveMember, updateMember, fetchMember}){
  const { register, errors, handleSubmit, setValue } = useForm();

  const { modalFetchId, modalType, modalButtonSaveEnable, member } = modalAttr

  React.useEffect(() => {
    if(modalFetchId){
      fetchMember(modalFetchId);
    }
  }, [fetchMember, modalFetchId])

  React.useEffect(() => {
    if (member){
      for (let [key, value] of Object.entries(member)) {
        setValue(key, value)
      }
    }
  }, [member, setValue])

  const onSubmit = data => {
    if (modalType === 'new'){
      saveMember(data);
    } else {
      updateMember(modalFetchId, data)
    }
  }

  const handleClickCloseModal = () => {
    closeModal();
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-8 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-1xl font-semibold">{ modalType === 'new' ? 'Tambah Buku' : 'Edit Buku' }</h3>
              <button onClick={handleClickCloseModal} >
                <span className="text-black "> × </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="shadow px-6 py-4 overflow-hidden sm:rounded-md">
                    <div className="px-8 py-8 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-10">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                          <input type="text" ref={register({ required: true})} name="name" className={
                            `mt-1 block w-full shadow-sm sm:text-sm ${errors.name ? "focus:ring-red-500 focus:border-red-500 rounded-md border-red-300" 
                            : "focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300"}`}/>
                          {errors.name ? (<p className="text-xs text-red-500">Nama wajib diisi.</p>) : null}
                        </div>
                        <div className="col-span-10">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat</label>
                          <input type="text" ref={register({ required: true})} name="address"  className={
                            `mt-1 block w-full shadow-sm sm:text-sm ${errors.address ? "focus:ring-red-500 focus:border-red-500 rounded-md border-red-300" 
                            : "focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300"}`}/>
                          {errors.address ? (<p className="text-xs text-red-500">Alamat wajib diisi.</p>) : null}
                        </div>
                        <div className="col-span-10">
                          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Nomor telepon</label>
                          <input type="text" ref={register({ required: true, pattern: /^(0|[1-9][0-9]*)$/ })} name="phoneNumber" className={
                            `mt-1 block w-full shadow-sm sm:text-sm ${errors.phoneNumber ? "focus:ring-red-500 focus:border-red-500 rounded-md border-red-300" 
                            : "focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300"}`}/>
                          {errors.phoneNumber ? (<p className="text-xs text-red-500">Nomor telepon salah.</p>) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={handleClickCloseModal}
                    >
                      Tutup
                    </button>
                    <input
                      disabled={!modalButtonSaveEnable}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                      value={modalButtonSaveEnable ? 'Simpan' : 'Menyimpan...'}
                    />
                  </div>
                </form>
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
    modalAttr: {
      modalType: state.membersReducer.modalType,
      modalFetchId: state.membersReducer.modalFetchId,
      modalButtonSaveEnable: state.membersReducer.modalButtonSaveEnable,
      member: state.membersReducer.member
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(modalMembersClose())
    },
    saveMember: (member) => {
      dispatch(saveMembersRequest(member))
    },
    updateMember: (id, member) => {
      dispatch(updateMembersRequest({ id: id, member: member }))
    }, 
    fetchMember: (id) => {
      dispatch(fetchMembersDetailRequest(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MemberModal);