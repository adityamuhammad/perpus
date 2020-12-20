import React from 'react';
import debounce from 'lodash.debounce';

function useDebounce(callback, delay) {
	const debouncedFn = React.useCallback(
		debounce((...args) => callback(...args), delay),
		[delay], // will recreate if delay changes
	);
	return debouncedFn;
}

export default useDebounce;