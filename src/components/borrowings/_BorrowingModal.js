import React from 'react';
import { fetchBooksRequest } from '../../redux/books/booksAction';
import useDebounce from './../../hooks/useDebounce';
import { connect } from 'react-redux';
import SelectBook from './_SelectBook';
import { modalBorrowingsClose } from '../../redux/borrowings/borrowingsAction';
import { useForm } from 'react-hook-form';

function BorrowingModal({booksLoading, booksError, books, fetchBooks, closeModal}){
  const [isBookSelectHidden, setIsBookSelectHidden] = React.useState(true);
  const [isBorrowerSelectHidden, setIsBorrowerSelectHidden] = React.useState(true);

  const { register, errors, watch, handleSubmit, setValue, getValues } = useForm();

  const handleChangeSelectBorrower = (e) => {
    setIsBorrowerSelectHidden(false)
  }

  const handleCloseModal = () => {
    closeModal();
  }

  const debounceFetchBooks = useDebounce(value => {
    fetchBooks({search: value})
  }, 1000)

  const handleChangeSelectBook = (e) => {
    if (e.target.value === ''){
      setIsBookSelectHidden(true)
    } else {
      setIsBookSelectHidden(false)
      debounceFetchBooks(e.target.value);
    }
  }

  const [selectedBookTitle, setSelectedBookTitle] = React.useState("");
  const selectedBookId = getValues("bookId")
  const watchBook = watch("bookId", "");

  const handleChangeRemoveBook = (e) => {
    setValue("bookId", null)
  }

  const handleChangePickBook = ({id, title, author}) => {
    setIsBookSelectHidden(true);
    setSelectedBookTitle(title)
    setValue("bookId", id)
  }

  const onSubmit = data => {
    console.log('submited..')
  }

  return (
    <>
      <div
        className="
          justify-center items-center flex 
          overflow-x-hidden overflow-y-auto 
          fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-8 mx-auto max-w-3xl">
          {/*content*/}
          <div className="
            border-0 rounded-lg shadow-lg 
            relative flex flex-col w-full 
            bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-1xl font-semibold">Peminjaman</h3>
              <button onClick={handleCloseModal} >
                <span className="text-black "> × </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative w-96 p-6 flex-auto">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label id="listbox-label" className="
                      z-0 mt-1 focus:ring-indigo-500 
                      focus:border-indigo-500 block 
                      w-full shadow-sm sm:text-sm 
                      border-gray-300 reunded-md">
                      Peminjam
                    </label>
                    <input 
                      type="text" 
                      name="selectBorrower" 
                      autoComplete="off" 
                      onChange={handleChangeSelectBorrower} 
                      className="
                        mt-1 block w-full shadow-sm 
                        sm:text-sm focus:ring-indigo-500 
                        focus:border-indigo-500 rounded-md border-gray-300"/>
                  </div>

                  <div>
                    <label id="listbox-label" className="z-0 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      Buku
                    </label>
                    <input 
                      type="hidden"
                      name="bookId"
                      ref={register({ required: true})}
                    />
                    { !watchBook 
                      ? <input 
                          type="text" 
                          name="selectBook" 
                          autoComplete="off" 
                          onChange={handleChangeSelectBook} 
                          className="
                            mt-1 block w-full shadow-sm 
                            sm:text-sm focus:ring-indigo-500 
                            focus:border-indigo-500 rounded-md border-gray-300"/>
                      : <div 
                          onClick={handleChangeRemoveBook}
                          aria-haspopup="listbox" 
                          aria-expanded="true" 
                          aria-labelledby="listbox-label" 
                          className="
                            relative w-full bg-white 
                            border border-gray-300 
                            rounded-md shadow-sm 
                            pl-3 pr-10 py-2 text-left 
                            cursor-default focus:outline-none 
                            focus:ring-1 focus:ring-indigo-500 
                            focus:border-indigo-500 sm:text-sm">
                          <span className="flex items-center">
                            <span className="">
                              { selectedBookTitle}
                            </span>
                          </span>
                          <div 
                            className="
                              ml-3 bg-yellow-300 pl-2 rounded absolute inset-y-0 right-0 
                              flex items-center pr-2 pointer-events-none">
                            change
                          </div>
                        </div>
                    }
                  </div>

                    { !isBookSelectHidden && <SelectBook 
                      books={books} 
                      handleChangePickBook={handleChangePickBook} 
                      selectedBookId={selectedBookId} />  }
                  <div className="flex items-center justify-end p-6 rounded-b z-0">
                    <button
                      className="
                        text-red-500 background-transparent 
                        font-bold uppercase px-6 py-2 text-sm 
                        outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={handleCloseModal}
                    >
                      Tutup
                    </button>
                    <input
                      className="
                        inline-flex justify-center py-2 px-4 
                        border border-transparent shadow-sm 
                        text-sm font-medium rounded-md text-white 
                        bg-indigo-600 hover:bg-indigo-700 
                        focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-indigo-500"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                      value='Simpan'
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
    books: state.booksReducer.books,
    booksLoading: state.booksReducer.loading,
    booksError: state.booksReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: (params = {}) => {
      dispatch(fetchBooksRequest(params));
    },
    closeModal: () => {
      dispatch(modalBorrowingsClose())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BorrowingModal);