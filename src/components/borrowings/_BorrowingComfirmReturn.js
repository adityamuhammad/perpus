import React from 'react';
import { connect } from 'react-redux';
import { confirmReturnBorrowingsClose, returnBorrowingsRequest } from '../../redux/borrowings/borrowingsAction';

function BorrowingConfirmReturn({closeConfirmReturn, returnBook, id}){
  const handleClickCloseConfirmReturn = () => {
    closeConfirmReturn();
  }

  const handleClickReturnBook = () => {
    returnBook(id);
  }
  return (
    <>
      <div
        className="
          justify-center items-center flex 
          overflow-x-hidden overflow-y-auto 
          fixed inset-0 z-50 outline-none 
          focus:outline-none"
      >
        <div className="relative w-auto my-8 mx-auto max-w-3xl">
          {/*content*/}
          <div className="
            border-0 rounded-lg shadow-lg 
            relative flex flex-col w-full 
            bg-white outline-none 
            focus:outline-none">
            {/*header*/}
            <div className="
              flex items-start justify-between 
              p-3 border-b border-solid 
              border-gray-300 rounded-t">
              <h3 className="text-1xl font-semibold">Konfirmasi Kembalikan Buku</h3>
              <button onClick={handleClickCloseConfirmReturn}>
                <span className="text-black "> × </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <button
                  onClick={handleClickCloseConfirmReturn}
                  className="
                    text-black-500 background-transparent 
                    font-bold uppercase px-6 py-2 border 
                    text-sm outline-none 
                    focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                > Tutup </button>
                <button
                  onClick={handleClickReturnBook}
                  className="
                    text-indigo-500 background-transparent 
                    border hover:ring-indigo-300 font-bold 
                    uppercase px-6 py-2 text-sm 
                    outline-none focus:outline-none 
                    mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                > Konfirmasi </button>
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
    id: state.borrowingsReducer.confirmReturnId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeConfirmReturn: () => {
      dispatch(confirmReturnBorrowingsClose())
    },
    returnBook: (id) => {
      dispatch(returnBorrowingsRequest(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowingConfirmReturn);