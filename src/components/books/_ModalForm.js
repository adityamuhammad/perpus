import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { fetchBooksDetailRequest, modalBooksClose, saveBooksRequest, updateBooksRequest } from '../../redux/books/booksAction';

function ModalForm({closeModal, modalAttr, saveBook, updateBook, fetchBook}){
  const { register, errors, handleSubmit, setValue } = useForm();

  const { modalFetchId, modalType, modalButtonSaveEnable, book } = modalAttr

  React.useEffect(() => {
    if(modalFetchId){
      fetchBook(modalFetchId);
    }
  }, [fetchBook, modalFetchId])

  React.useEffect(() => {
    if (book){
      for (let [key, value] of Object.entries(book)) {
        if (key === "publishedDate"){
          setValue(key, value.substr(0,10))
        } else {
          setValue(key, value)
        }
      }
    }
  }, [book, setValue])

  const onSubmit = data => {
    if (modalType === 'new'){
      saveBook(data);
    } else {
      updateBook(modalFetchId, data)
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
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul buku</label>
                          <input type="text" ref={register({ required: true})} name="title" className={
                            `mt-1 block w-full shadow-sm sm:text-sm ${errors.title ? "focus:ring-red-500 focus:border-red-500 rounded-md border-red-300" 
                            : "focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300"}`}/>
                          {errors.title ? (<p className="text-xs text-red-500">Judul wajib diisi</p>) : null}
                        </div>
                        <div className="col-span-10">
                          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Penulis</label>
                          <input type="text" ref={register({ required: true})} name="author"  className={
                            `mt-1 block w-full shadow-sm sm:text-sm ${errors.author ? "focus:ring-red-500 focus:border-red-500 rounded-md border-red-300" 
                            : "focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300"}`}/>
                          {errors.author ? (<p className="text-xs text-red-500">Penulis wajib diisi</p>) : null}
                        </div>
                        <div className="col-span-10">
                          <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Tanggal publish</label>
                          <input type="date" ref={register({ required: true})} name="publishedDate" className={
                            `mt-1 block w-full shadow-sm sm:text-sm ${errors.publishedDate ? "focus:ring-red-500 focus:border-red-500 rounded-md border-red-300" 
                            : "focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300"}`}/>
                          {errors.publishedDate ? (<p className="text-xs text-red-500">Tanggal Publish wajib diisi</p>) : null}
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
                      Close
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

const mapStateTopProps = state => {
  return {
    modalAttr: {
      modalType: state.booksReducer.modalType,
      modalFetchId: state.booksReducer.modalFetchId,
      modalButtonSaveEnable: state.booksReducer.modalButtonSaveEnable,
      book: state.booksReducer.book
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(modalBooksClose())
    },
    saveBook: (book) => {
      dispatch(saveBooksRequest(book))
    },
    updateBook: (id, book) => {
      dispatch(updateBooksRequest({ id: id, book: book }))
    }, 
    fetchBook: (id) => {
      dispatch(fetchBooksDetailRequest(id))
    }
  }
}

export default connect(mapStateTopProps,mapDispatchToProps)(ModalForm);