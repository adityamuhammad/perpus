import React from 'react';

function SelectBorrower({borrowers, handleChangePickBorrower, selectedBorrowerId}){
  return (
    <div className="mt-1 relative z-10">
      {/* <!--
        Select popover, show/hide based on select state.

        Entering: ""
          From: ""
          To: ""
        Leaving: "transition ease-in duration-100"
          From: "opacity-100"
          To: "opacity-0"
      --> */}
      <div className="absolute mt-1 w-full overflow-visible rounded-md bg-white shadow-lg">
        <ul 
          tabIndex="-1" 
          role="listbox" 
          aria-labelledby="listbox-label" 
          aria-activedescendant="listbox-item-3" 
          className="
            max-h-40 rounded-md py-0 
            text-base ring-1 ring-black 
            ring-opacity-5 overflow-y-auto 
            focus:outline-none sm:text-sm">
          {/* <!--
            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

            Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
          --> */}
          { borrowers.map(borrower => {
            return (
              <li 
                onClick={() => handleChangePickBorrower(borrower)} key={borrower.id} 
                id="listbox-item-0" 
                className="
                  text-gray-900 cursor-default 
                  select-none relative py-2 
                  pl-3 pr-9 hover:bg-indigo-700 
                  hover:text-white">
                <div className="flex items-center">
                  <span className="ml-3 text-md block font-normal truncate">
                    {borrower.name}
                  </span>
                </div>

                {/* <!--
                  Checkmark, only display for selected option.

                  Highlighted: "text-white", Not Highlighted: "text-indigo-600"
                --> */}
                {(borrower.id === selectedBorrowerId) && (
                  <span 
                    className=" absolute inset-y-0 right-0 flex items-center pr-4">
                    {/* <!-- Heroicon name: check --> */}
                    <svg 
                      className="h-5 w-5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      aria-hidden="true">
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" />
                    </svg>
                  </span>)
                }
              </li>
            )
          })}
          {/* <!-- More options... --> */}
        </ul>
      </div>
    </div>
  )
}

export default SelectBorrower;